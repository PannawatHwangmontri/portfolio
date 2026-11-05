import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { Resume, ResumesService } from './resumes.service.js';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Get('active')
  async findActive(): Promise<Resume | null> {
    return this.resumesService.findActive();
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Resume[]> {
    return this.resumesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async upload(@Body() body: { filename: string; fileData: string }): Promise<Resume> {
    return this.resumesService.upload(body.filename, body.fileData);
  }

  @Put(':id/activate')
  @UseGuards(AuthGuard)
  async activate(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.activate(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.resumesService.delete(id);
  }
}
