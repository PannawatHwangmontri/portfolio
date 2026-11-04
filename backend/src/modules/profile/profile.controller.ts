import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { ProfileService } from './profile.service.js';
import {
  AboutContent,
  ContactInfoContent,
  HeroContent,
  SiteContent,
  SkillsContent,
} from './site-content.data.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getContent(): Promise<SiteContent> {
    return this.profileService.getContent();
  }

  @Put('hero')
  @UseGuards(AuthGuard)
  async updateHero(@Body() payload: Partial<HeroContent>): Promise<HeroContent> {
    return this.profileService.updateHero(payload);
  }

  @Put('about')
  @UseGuards(AuthGuard)
  async updateAbout(@Body() payload: Partial<AboutContent>): Promise<AboutContent> {
    return this.profileService.updateAbout(payload);
  }

  @Put('skills')
  @UseGuards(AuthGuard)
  async updateSkills(@Body() payload: Partial<SkillsContent>): Promise<SkillsContent> {
    return this.profileService.updateSkills(payload);
  }

  @Put('contact-info')
  @UseGuards(AuthGuard)
  async updateContactInfo(
    @Body() payload: Partial<ContactInfoContent>,
  ): Promise<ContactInfoContent> {
    return this.profileService.updateContactInfo(payload);
  }
}
