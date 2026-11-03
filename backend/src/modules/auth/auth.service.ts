import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async login(payload: { email?: string; password?: string }): Promise<LoginResponse> {
    const { email, password } = payload;
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const client = this.supabaseService.getClient();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      this.logger.warn(`Failed login attempt for ${email}: ${error?.message}`);
      throw new UnauthorizedException(error?.message || 'Invalid credentials');
    }

    this.logger.log(`Admin user ${email} logged in successfully`);
    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? email,
      },
      token: data.session.access_token,
    };
  }
}
