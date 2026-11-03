import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { ContactMessage } from './contact.data.js';
import { ContactService } from './contact.service.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitMessage(@Body() payload: { name: string; email: string; message: string }) {
    return this.contactService.submitMessage(payload);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<ContactMessage[]> {
    return this.contactService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
