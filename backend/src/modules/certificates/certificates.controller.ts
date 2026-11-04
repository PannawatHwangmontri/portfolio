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
import { Certificate } from './certificates.data.js';
import { CertificatesService } from './certificates.service.js';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get()
  async findAll(): Promise<Certificate[]> {
    return this.certificatesService.findAll();
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  async upload(
    @Body() body: { filename: string; fileData: string; contentType?: string },
  ): Promise<{ url: string }> {
    return this.certificatesService.uploadImage(
      body.filename,
      body.fileData,
      body.contentType || 'image/png',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Certificate> {
    return this.certificatesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: Partial<Certificate>): Promise<Certificate> {
    return this.certificatesService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() payload: Partial<Certificate>): Promise<Certificate> {
    return this.certificatesService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    return this.certificatesService.delete(id);
  }
}
