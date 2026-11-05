import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module.js';
import { ResumesController } from './resumes.controller.js';
import { ResumesService } from './resumes.service.js';

@Module({
  imports: [SupabaseModule],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
