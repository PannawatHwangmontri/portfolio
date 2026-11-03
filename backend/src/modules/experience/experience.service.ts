import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { ExperienceItem } from './experience.data.js';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(type?: 'work' | 'education'): Promise<ExperienceItem[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('experiences').select('*').order('order', { ascending: true });
    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) {
      this.logger.error('Failed to fetch experiences from Supabase', error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    return (data || []) as ExperienceItem[];
  }

  async findOne(id: string): Promise<ExperienceItem> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('experiences').select('*').eq('id', id).maybeSingle();

    if (error) {
      this.logger.error(`Failed to fetch experience ${id} from Supabase`, error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException(`Experience ${id} not found`);
    }

    return data as ExperienceItem;
  }

  async create(payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    const client = this.supabaseService.getClient();
    const newItem: Partial<ExperienceItem> = {
      id: payload.id || `exp-${Date.now()}`,
      type: payload.type || 'work',
      title: payload.title || { th: 'ตำแหน่ง/การศึกษาใหม่', en: 'New Role/Degree' },
      organization: payload.organization || { th: '', en: '' },
      period: payload.period || '2025 - Present',
      description: payload.description || { th: '', en: '' },
      skills: payload.skills || [],
      order: payload.order ?? 1,
    };

    const { data, error } = await client.from('experiences').insert(newItem).select().single();
    if (error || !data) {
      this.logger.error('Error inserting experience to Supabase', error);
      throw new InternalServerErrorException(error?.message || 'Failed to create experience');
    }

    return data as ExperienceItem;
  }

  async update(id: string, payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('experiences').update(payload).eq('id', id).select().maybeSingle();

    if (error) {
      this.logger.error(`Error updating experience ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Experience ${id} not found`);
    }

    return data as ExperienceItem;
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    const { error } = await client.from('experiences').delete().eq('id', id);

    if (error) {
      this.logger.error(`Error deleting experience ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    return { success: true, message: `Experience ${id} deleted successfully` };
  }
}
