import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { ContactMessage, initialMessages } from './contact.data.js';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private memoryMessages: ContactMessage[] = [...initialMessages];

  constructor(private readonly supabaseService: SupabaseService) {}

  async submitMessage(payload: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
    const { name, email, message } = payload;

    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Name is required');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Valid email is required');
    }
    if (!message || message.trim().length < 5) {
      throw new BadRequestException('Message must be at least 5 characters');
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { error } = await client.from('contacts').insert(newMessage);
        if (!error) {
          this.logger.log(`New contact message received from ${email}`);
          return { success: true, message: 'Message sent successfully' };
        }
      } catch (err) {
        this.logger.error('Error saving contact message to Supabase', err);
      }
    }

    this.memoryMessages.unshift(newMessage);
    this.logger.log(`New contact message saved in memory from ${email}`);
    return { success: true, message: 'Message sent successfully' };
  }

  async findAll(): Promise<ContactMessage[]> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('contacts').select('*').order('createdAt', { ascending: false });
        if (!error && data) return data as ContactMessage[];
      } catch (err) {
        this.logger.warn('Failed to fetch contact messages from Supabase', err);
      }
    }
    return this.memoryMessages;
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        await client.from('contacts').delete().eq('id', id);
      } catch (err) {
        this.logger.error(`Error deleting contact ${id} on Supabase`, err);
      }
    }

    const index = this.memoryMessages.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException(`Message ${id} not found`);

    this.memoryMessages.splice(index, 1);
    return { success: true, message: `Message ${id} deleted` };
  }
}
