import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { Project } from './projects.data.js';

interface GitHubRawRepo {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  updated_at: string;
}

export interface GitHubRepoAdminItem {
  id: string;
  repoId: number;
  name: string;
  description: string;
  fork: boolean;
  language: string;
  stars: number;
  forks: number;
  repoUrl: string;
  demoUrl: string;
  isVisible: boolean;
  updatedAt: string;
}

function mapProjectFromDb(row: Record<string, any>): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    tags: row.tags || [],
    demoUrl: row.demo_url ?? row.demoUrl ?? '',
    repoUrl: row.repo_url ?? row.repoUrl ?? '',
    featured: row.featured ?? false,
    order: row.order ?? 0,
    createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString(),
  };
}

function mapProjectToDb(payload: Partial<Project>): Record<string, any> {
  const row: Record<string, any> = {};
  if (payload.id !== undefined) row.id = payload.id;
  if (payload.title !== undefined) row.title = payload.title;
  if (payload.description !== undefined) row.description = payload.description;
  if (payload.category !== undefined) row.category = payload.category;
  if (payload.tags !== undefined) row.tags = payload.tags;
  if (payload.demoUrl !== undefined) row.demo_url = payload.demoUrl;
  if (payload.repoUrl !== undefined) row.repo_url = payload.repoUrl;
  if (payload.featured !== undefined) row.featured = payload.featured;
  if (payload.order !== undefined) row.order = payload.order;
  if (payload.createdAt !== undefined) row.created_at = payload.createdAt;
  return row;
}

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private githubCache: { timestamp: number; data: Project[] } | null = null;
  private readonly CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

  constructor(private readonly supabaseService: SupabaseService) {}

  private async fetchRawGithubRepos(): Promise<GitHubRawRepo[]> {
    try {
      const response = await fetch(
        'https://api.github.com/users/PannawatHwangmontri/repos?sort=updated&per_page=100',
        {
          headers: {
            'User-Agent': 'Portfolio-App',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        this.logger.warn(`GitHub API responded with status ${response.status}`);
        return [];
      }

      const repos = (await response.json()) as GitHubRawRepo[];
      return Array.isArray(repos) ? repos : [];
    } catch (err) {
      this.logger.error('Failed to fetch repos from GitHub API', err);
      return [];
    }
  }

  private async getVisibilityMap(): Promise<Map<string, boolean>> {
    const visibilityMap = new Map<string, boolean>();
    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client.from('github_repos').select('repo_id, is_visible');
      if (!error && data) {
        for (const row of data) {
          visibilityMap.set(String(row.repo_id), Boolean(row.is_visible));
        }
      } else if (error) {
        this.logger.warn(`Failed to fetch github_repos table: ${error.message}`);
      }
    } catch (err) {
      this.logger.warn('Failed to query github_repos table from Supabase', err);
    }
    return visibilityMap;
  }

  async fetchGithubRepos(): Promise<Project[]> {
    if (this.githubCache && Date.now() - this.githubCache.timestamp < this.CACHE_TTL_MS) {
      return this.githubCache.data;
    }

    const [rawRepos, visibilityMap] = await Promise.all([
      this.fetchRawGithubRepos(),
      this.getVisibilityMap(),
    ]);

    // Only show repos where is_visible is explicitly true (Default is hidden: 2.A)
    // Option 4.A: Show all toggled repos without artificial 6-item limit
    const visibleRepos = rawRepos
      .filter((repo) => visibilityMap.get(String(repo.id)) === true)
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
      data: visibleRepos,
    };

    return visibleRepos;
  }

  async findAllGithubReposAdmin(): Promise<GitHubRepoAdminItem[]> {
    const [rawRepos, visibilityMap] = await Promise.all([
      this.fetchRawGithubRepos(),
      this.getVisibilityMap(),
    ]);

    return rawRepos.map((repo) => ({
      id: `gh-${repo.id}`,
      repoId: repo.id,
      name: repo.name,
      description: repo.description || '',
      fork: Boolean(repo.fork),
      language: repo.language || 'Other',
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || '',
      isVisible: visibilityMap.get(String(repo.id)) === true,
      updatedAt: repo.updated_at,
    }));
  }

  async toggleGithubRepoVisibility(
    repoId: string,
    name: string,
    isVisible: boolean,
  ): Promise<{ success: boolean; repoId: string; isVisible: boolean }> {
    const client = this.supabaseService.getClient();
    const { error } = await client.from('github_repos').upsert(
      {
        repo_id: String(repoId),
        name: name || `repo-${repoId}`,
        is_visible: isVisible,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'repo_id' },
    );

    if (error) {
      this.logger.error('Failed to toggle github repo visibility in Supabase', error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    // Invalidate public cache so changes appear immediately
    this.githubCache = null;

    return { success: true, repoId: String(repoId), isVisible };
  }

  async findAll(category?: string): Promise<Project[]> {
    if (category === 'github') {
      return this.fetchGithubRepos();
    }

    const client = this.supabaseService.getClient();
    let query = client.from('projects').select('*').order('order', { ascending: true });
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      this.logger.error('Failed to fetch projects from Supabase', error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    const dbProjects = (data || []).map(mapProjectFromDb);

    if (!category || category === 'all') {
      const githubProjects = await this.fetchGithubRepos();
      return [...dbProjects, ...githubProjects];
    }

    return dbProjects;
  }

  async findOne(id: string): Promise<Project> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('projects').select('*').eq('id', id).maybeSingle();

    if (error) {
      this.logger.error(`Failed to fetch project ${id} from Supabase`, error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return mapProjectFromDb(data);
  }

  async create(payload: Partial<Project>): Promise<Project> {
    const client = this.supabaseService.getClient();
    const newId = payload.id || `project-${Date.now()}`;
    const dbPayload = mapProjectToDb({
      ...payload,
      id: newId,
      title: payload.title || { th: 'โปรเจกต์ใหม่', en: 'New Project' },
      description: payload.description || { th: '', en: '' },
      category: payload.category || 'web',
      tags: payload.tags || [],
      demoUrl: payload.demoUrl || '',
      repoUrl: payload.repoUrl || '',
      featured: payload.featured ?? false,
      order: payload.order ?? 1,
      createdAt: payload.createdAt || new Date().toISOString(),
    });

    const { data, error } = await client.from('projects').insert(dbPayload).select().single();
    if (error || !data) {
      this.logger.error('Error inserting project to Supabase', error);
      throw new InternalServerErrorException(error?.message || 'Failed to create project');
    }

    return mapProjectFromDb(data);
  }

  async update(id: string, payload: Partial<Project>): Promise<Project> {
    const client = this.supabaseService.getClient();
    const dbPayload = mapProjectToDb(payload);

    const { data, error } = await client.from('projects').update(dbPayload).eq('id', id).select().maybeSingle();
    if (error) {
      this.logger.error(`Error updating project ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return mapProjectFromDb(data);
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    const { error } = await client.from('projects').delete().eq('id', id);
    if (error) {
      this.logger.error(`Error deleting project ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    return { success: true, message: `Project ${id} deleted successfully` };
  }
}
