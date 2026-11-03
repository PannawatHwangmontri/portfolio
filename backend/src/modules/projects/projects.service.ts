import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { initialProjects, Project } from './projects.data.js';

interface GitHubRawRepo {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  updated_at: string;
}

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private memoryProjects: Project[] = [...initialProjects];
  private githubCache: { timestamp: number; data: Project[] } | null = null;
  private readonly CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

  constructor(private readonly supabaseService: SupabaseService) {}

  async fetchGithubRepos(): Promise<Project[]> {
    if (this.githubCache && Date.now() - this.githubCache.timestamp < this.CACHE_TTL_MS) {
      return this.githubCache.data;
    }

    try {
      const response = await fetch(
        'https://api.github.com/users/PannawatHwangmontri/repos?sort=updated&per_page=30',
        {
          headers: {
            'User-Agent': 'Portfolio-App',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        this.logger.warn(`GitHub API responded with status ${response.status}`);
        return this.githubCache?.data || [];
      }

      const repos = (await response.json()) as GitHubRawRepo[];
      if (!Array.isArray(repos)) {
        return this.githubCache?.data || [];
      }

      const filtered = repos
        .filter((repo) => !repo.fork)
        .slice(0, 6)
        .map((repo, idx): Project => ({
          id: `gh-${repo.id}`,
          title: {
            th: repo.name,
            en: repo.name,
          },
          description: {
            th: repo.description || `โอเพนซอร์สโปรเจกต์ ${repo.name} บน GitHub`,
            en: repo.description || `Public open-source repository ${repo.name} on GitHub`,
          },
          category: 'github',
          tags: [repo.language, 'GitHub', 'Open Source'].filter(Boolean) as string[],
          demoUrl: repo.homepage || '',
          repoUrl: repo.html_url,
          featured: false,
          order: idx + 1,
          createdAt: repo.updated_at,
        }));

      this.githubCache = {
        timestamp: Date.now(),
        data: filtered,
      };

      return filtered;
    } catch (err) {
      this.logger.error('Failed to fetch repos from GitHub API', err);
      return this.githubCache?.data || [];
    }
  }

  async findAll(category?: string): Promise<Project[]> {
    if (category === 'github') {
      return this.fetchGithubRepos();
    }

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        let query = client.from('projects').select('*').order('order', { ascending: true });
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as Project[];
        }
      } catch (err) {
        this.logger.warn('Failed to fetch projects from Supabase, falling back to memory store', err);
      }
    }

    if (category && category !== 'all') {
      return this.memoryProjects.filter((p) => p.category === category);
    }
    return this.memoryProjects;
  }

  async findOne(id: string): Promise<Project> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('projects').select('*').eq('id', id).single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        this.logger.warn(`Failed to fetch project ${id} from Supabase`, err);
      }
    }

    const found = this.memoryProjects.find((p) => p.id === id);
    if (!found) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return found;
  }

  async create(payload: Partial<Project>): Promise<Project> {
    const newProject: Project = {
      id: payload.id || `project-${Date.now()}`,
      title: payload.title || { th: 'โปรเจกต์ใหม่', en: 'New Project' },
      description: payload.description || { th: '', en: '' },
      category: payload.category || 'web',
      tags: payload.tags || [],
      demoUrl: payload.demoUrl || '',
      repoUrl: payload.repoUrl || '',
      featured: payload.featured ?? false,
      order: payload.order ?? this.memoryProjects.length + 1,
      createdAt: new Date().toISOString(),
    };

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('projects').insert(newProject).select().single();
        if (!error && data) {
          return data as Project;
        }
        this.logger.warn('Supabase insert failed, saving to memory store', error);
      } catch (err) {
        this.logger.error('Error inserting project to Supabase', err);
      }
    }

    this.memoryProjects.unshift(newProject);
    return newProject;
  }

  async update(id: string, payload: Partial<Project>): Promise<Project> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('projects').update(payload).eq('id', id).select().single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        this.logger.error(`Error updating project ${id} on Supabase`, err);
      }
    }

    const index = this.memoryProjects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    this.memoryProjects[index] = {
      ...this.memoryProjects[index],
      ...payload,
    };
    return this.memoryProjects[index];
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { error } = await client.from('projects').delete().eq('id', id);
        if (!error) {
          return { success: true, message: `Project ${id} deleted successfully` };
        }
      } catch (err) {
        this.logger.error(`Error deleting project ${id} on Supabase`, err);
      }
    }

    const index = this.memoryProjects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    this.memoryProjects.splice(index, 1);
    return { success: true, message: `Project ${id} deleted successfully` };
  }
}
