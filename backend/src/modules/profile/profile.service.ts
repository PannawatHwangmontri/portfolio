import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import {
  AboutContent,
  ContactInfoContent,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CONTACT_INFO,
  DEFAULT_SKILLS_CONTENT,
  SiteContent,
  SkillsContent,
} from './site-content.data.js';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async getContent(): Promise<SiteContent> {
    const content: SiteContent = {
      about: { ...DEFAULT_ABOUT_CONTENT },
      skills: { ...DEFAULT_SKILLS_CONTENT },
      contactInfo: { ...DEFAULT_CONTACT_INFO },
    };

    if (!this.supabaseService.isConfigured()) {
      return content;
    }

    try {
      const client = this.supabaseService.getClient();
      const { data, error } = await client
        .from('site_content')
        .select('key, data');

      if (error) {
        this.logger.warn(`Could not load site_content from database: ${error.message}. Using defaults.`);
        return content;
      }

      if (data && Array.isArray(data)) {
        for (const item of data) {
          if (item.key === 'about' && item.data) {
            content.about = { ...DEFAULT_ABOUT_CONTENT, ...item.data };
          } else if (item.key === 'skills' && item.data) {
            content.skills = { ...DEFAULT_SKILLS_CONTENT, ...item.data };
          } else if (item.key === 'contact_info' && item.data) {
            content.contactInfo = { ...DEFAULT_CONTACT_INFO, ...item.data };
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Error reading site_content: ${msg}. Returning defaults.`);
    }

    return content;
  }

  async updateAbout(payload: Partial<AboutContent>): Promise<AboutContent> {
    const current = await this.getContent();
    const updated: AboutContent = {
      ...current.about,
      ...payload,
    };

    if (this.supabaseService.isConfigured()) {
      const client = this.supabaseService.getClient();
      const { error } = await client.from('site_content').upsert(
        {
          key: 'about',
          data: updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' },
      );

      if (error) {
        this.logger.error(`Failed to update about content: ${error.message}`);
        throw new InternalServerErrorException(`Database error: ${error.message}`);
      }
    }

    return updated;
  }

  async updateSkills(payload: Partial<SkillsContent>): Promise<SkillsContent> {
    const current = await this.getContent();
    const updated: SkillsContent = {
      ...current.skills,
      ...payload,
    };

    if (this.supabaseService.isConfigured()) {
      const client = this.supabaseService.getClient();
      const { error } = await client.from('site_content').upsert(
        {
          key: 'skills',
          data: updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' },
      );

      if (error) {
        this.logger.error(`Failed to update skills content: ${error.message}`);
        throw new InternalServerErrorException(`Database error: ${error.message}`);
      }
    }

    return updated;
  }

  async updateContactInfo(payload: Partial<ContactInfoContent>): Promise<ContactInfoContent> {
    const current = await this.getContent();
    const updated: ContactInfoContent = {
      ...current.contactInfo,
      ...payload,
    };

    if (this.supabaseService.isConfigured()) {
      const client = this.supabaseService.getClient();
      const { error } = await client.from('site_content').upsert(
        {
          key: 'contact_info',
          data: updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' },
      );

      if (error) {
        this.logger.error(`Failed to update contact info content: ${error.message}`);
        throw new InternalServerErrorException(`Database error: ${error.message}`);
      }
    }

    return updated;
  }
}
