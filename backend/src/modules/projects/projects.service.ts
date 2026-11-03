import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { initialProjects, Project } from './projects.data.js';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private memoryProjects: Project[] = [...initialProjects];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(category?: string): Promise<Project[]> {
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
