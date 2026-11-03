import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { Article, initialArticles } from './articles.data.js';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);
  private memoryArticles: Article[] = [...initialArticles];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Article[]> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('articles').select('*').order('order', { ascending: true });
        if (!error && data && data.length > 0) return data as Article[];
      } catch (err) {
        this.logger.warn('Failed to fetch articles from Supabase', err);
      }
    }
    return this.memoryArticles;
  }

  async findOne(id: string): Promise<Article> {
    const found = this.memoryArticles.find((a) => a.id === id);
    if (!found) throw new NotFoundException(`Article ${id} not found`);
    return found;
  }

  async create(payload: Partial<Article>): Promise<Article> {
    const newArt: Article = {
      id: payload.id || `art-${Date.now()}`,
      title: payload.title || { th: 'บทความใหม่', en: 'New Article' },
      summary: payload.summary || { th: '', en: '' },
      category: payload.category || 'Tech',
      readTime: payload.readTime || '3 min read',
      publishedAt: payload.publishedAt || new Date().toISOString().split('T')[0],
      url: payload.url || '#',
      order: payload.order ?? this.memoryArticles.length + 1,
    };

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('articles').insert(newArt).select().single();
        if (!error && data) return data as Article;
      } catch (err) {
        this.logger.error('Error inserting article to Supabase', err);
      }
    }

    this.memoryArticles.unshift(newArt);
    return newArt;
  }

  async update(id: string, payload: Partial<Article>): Promise<Article> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('articles').update(payload).eq('id', id).select().single();
        if (!error && data) return data as Article;
      } catch (err) {
        this.logger.error(`Error updating article ${id} on Supabase`, err);
      }
    }

    const index = this.memoryArticles.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException(`Article ${id} not found`);

    this.memoryArticles[index] = { ...this.memoryArticles[index], ...payload };
    return this.memoryArticles[index];
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        await client.from('articles').delete().eq('id', id);
      } catch (err) {
        this.logger.error(`Error deleting article ${id} on Supabase`, err);
      }
    }

    const index = this.memoryArticles.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException(`Article ${id} not found`);

    this.memoryArticles.splice(index, 1);
    return { success: true, message: `Article ${id} deleted successfully` };
  }
}
