import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service.js';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  getStatus() {
    const isSupabaseConfigured = this.supabaseService.getClient() !== null;
    return {
      service: 'portfolio-backend-api',
      framework: 'NestJS (Node.js)',
      supabaseConfigured: isSupabaseConfigured,
      timestamp: new Date().toISOString(),
    };
  }
}
