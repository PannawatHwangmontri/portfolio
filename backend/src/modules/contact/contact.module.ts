import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

@Module({
  imports: [SupabaseModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
