import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module.js';
import { ExperienceController } from './experience.controller.js';
import { ExperienceService } from './experience.service.js';

@Module({
  imports: [SupabaseModule],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
