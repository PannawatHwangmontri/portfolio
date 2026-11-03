import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ArticlesModule } from './modules/articles/articles.module.js';
import { CertificatesModule } from './modules/certificates/certificates.module.js';
import { ContactModule } from './modules/contact/contact.module.js';
import { ExperienceModule } from './modules/experience/experience.module.js';
import { ProjectsModule } from './modules/projects/projects.module.js';
import { SupabaseModule } from './supabase/supabase.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    ProjectsModule,
    ExperienceModule,
    CertificatesModule,
    ArticlesModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
