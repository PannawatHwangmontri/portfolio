import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { Article } from './articles.data.js';
import { ArticlesService } from './articles.service.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: Partial<Article>): Promise<Article> {
    return this.articlesService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() payload: Partial<Article>): Promise<Article> {
    return this.articlesService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    return this.articlesService.delete(id);
  }
}
