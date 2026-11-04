import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient | null = null;

  getClient(token?: string): SupabaseClient {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new InternalServerErrorException(
        'Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY) are not configured'
      );
    }

    if (token) {
      return createClient(url, key, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }

    if (!this.client) {
      this.client = createClient(url, key);
      this.logger.log('Supabase client initialized successfully');
    }
    return this.client;
  }

  isConfigured(): boolean {
    return !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));
  }

  async verifyToken(token: string): Promise<User | null> {
    const client = this.getClient();

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
