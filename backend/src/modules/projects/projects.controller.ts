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
import { Project } from './projects.data.js';
import { ProjectsService } from './projects.service.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query('category') category?: string): Promise<Project[]> {
    return this.projectsService.findAll(category);
  }

  @Get('github/admin')
  @UseGuards(AuthGuard)
  async findAllGithubReposAdmin() {
    return this.projectsService.findAllGithubReposAdmin();
  }

  @Put('github/:repoId/visibility')
  @UseGuards(AuthGuard)
  async toggleGithubVisibility(
    @Param('repoId') repoId: string,
    @Body() body: { name: string; isVisible: boolean },
  ) {
    return this.projectsService.toggleGithubRepoVisibility(repoId, body.name, body.isVisible);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: Partial<Project>): Promise<Project> {
    return this.projectsService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() payload: Partial<Project>): Promise<Project> {
    return this.projectsService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    return this.projectsService.delete(id);
  }
}
