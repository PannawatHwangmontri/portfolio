import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { ExperienceItem, initialExperiences } from './experience.data.js';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);
  private memoryExperiences: ExperienceItem[] = [...initialExperiences];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(type?: 'work' | 'education'): Promise<ExperienceItem[]> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        let query = client.from('experiences').select('*').order('order', { ascending: true });
        if (type) {
          query = query.eq('type', type);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as ExperienceItem[];
        }
      } catch (err) {
        this.logger.warn('Failed to fetch experiences from Supabase', err);
      }
    }

    if (type) {
      return this.memoryExperiences.filter((e) => e.type === type);
    }
    return this.memoryExperiences;
  }

  async findOne(id: string): Promise<ExperienceItem> {
    const found = this.memoryExperiences.find((e) => e.id === id);
    if (!found) {
      throw new NotFoundException(`Experience ${id} not found`);
    }
    return found;
  }

  async create(payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    const newItem: ExperienceItem = {
      id: payload.id || `exp-${Date.now()}`,
      type: payload.type || 'work',
      title: payload.title || { th: 'ตำแหน่ง/การศึกษาใหม่', en: 'New Role/Degree' },
      organization: payload.organization || { th: '', en: '' },
      period: payload.period || '2025 - Present',
      description: payload.description || { th: '', en: '' },
      skills: payload.skills || [],
      order: payload.order ?? this.memoryExperiences.length + 1,
    };

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('experiences').insert(newItem).select().single();
        if (!error && data) return data as ExperienceItem;
      } catch (err) {
        this.logger.error('Error inserting experience to Supabase', err);
      }
    }

    this.memoryExperiences.unshift(newItem);
    return newItem;
  }

  async update(id: string, payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('experiences').update(payload).eq('id', id).select().single();
        if (!error && data) return data as ExperienceItem;
      } catch (err) {
        this.logger.error(`Error updating experience ${id} on Supabase`, err);
      }
    }

    const index = this.memoryExperiences.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Experience ${id} not found`);
    }

    this.memoryExperiences[index] = {
      ...this.memoryExperiences[index],
      ...payload,
    };
    return this.memoryExperiences[index];
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        await client.from('experiences').delete().eq('id', id);
      } catch (err) {
        this.logger.error(`Error deleting experience ${id} on Supabase`, err);
      }
    }

    const index = this.memoryExperiences.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Experience ${id} not found`);
    }

    this.memoryExperiences.splice(index, 1);
    return { success: true, message: `Experience ${id} deleted successfully` };
  }
}
