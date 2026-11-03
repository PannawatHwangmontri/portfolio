import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient | null = null;

  getClient(): SupabaseClient | null {
    if (!this.client) {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

      if (!url || !key) {
        this.logger.warn('Supabase credentials not configured in environment variables');
        return null;
      }

      this.client = createClient(url, key);
      this.logger.log('Supabase client initialized successfully');
    }
    return this.client;
  }

  isConfigured(): boolean {
    return !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));
  }

  async verifyToken(token: string): Promise<User | { id: string; email: string } | null> {
    const client = this.getClient();
    if (!client) {
      // Development fallback when Supabase is not yet configured
      if (token === 'dev-admin-token' || process.env.NODE_ENV !== 'production') {
        return { id: 'dev-admin', email: 'admin@pannawat.dev' };
      }
      return null;
    }

    try {
      const { data, error } = await client.auth.getUser(token);
      if (error || !data.user) {
        return null;
      }
      return data.user;
    } catch (err) {
      this.logger.error('Error verifying token with Supabase', err);
      return null;
    }
  }
}
