import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module.js';
import { ArticlesController } from './articles.controller.js';
import { ArticlesService } from './articles.service.js';

@Module({
  imports: [SupabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
