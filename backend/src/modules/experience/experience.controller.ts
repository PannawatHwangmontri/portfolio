import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { ExperienceItem } from './experience.data.js';
import { ExperienceService } from './experience.service.js';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async findAll(@Query('type') type?: 'work' | 'education'): Promise<ExperienceItem[]> {
    return this.experienceService.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExperienceItem> {
    return this.experienceService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    return this.experienceService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() payload: Partial<ExperienceItem>): Promise<ExperienceItem> {
    return this.experienceService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    return this.experienceService.delete(id);
  }
}
