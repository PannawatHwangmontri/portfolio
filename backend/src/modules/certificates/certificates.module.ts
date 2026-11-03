import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module.js';
import { CertificatesController } from './certificates.controller.js';
import { CertificatesService } from './certificates.service.js';

@Module({
  imports: [SupabaseModule],
  controllers: [CertificatesController],
  providers: [CertificatesService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
