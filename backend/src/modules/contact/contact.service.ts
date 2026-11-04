import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { ContactMessage } from './contact.data.js';

function mapContactFromDb(row: Record<string, any>): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    read: row.read ?? false,
    createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString(),
  };
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async submitMessage(payload: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
    const { name, email, message } = payload;

    if (!name || name.trim().length === 0) {
      throw new BadRequestException('กรุณากรอกชื่อของคุณ');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('กรุณากรอกอีเมลให้ถูกต้อง');
    }
    if (!message || message.trim().length === 0) {
      throw new BadRequestException('กรุณากรอกข้อความ');
    }

    const client = this.supabaseService.getClient();
    const dbPayload = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      read: false,
      created_at: new Date().toISOString(),
    };

    const { error } = await client.from('contacts').insert(dbPayload);
    if (error) {
      this.logger.error('Error saving contact message to Supabase', error);
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`New contact message received from ${email}`);
    return { success: true, message: 'Message sent successfully' };
  }

  async findAll(token?: string): Promise<ContactMessage[]> {
    const client = this.supabaseService.getClient(token);
    const { data, error } = await client.from('contacts').select('*').order('created_at', { ascending: false });

    if (error) {
      this.logger.error('Failed to fetch contact messages from Supabase', error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    return (data || []).map(mapContactFromDb);
  }

  async delete(id: string, token?: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient(token);
    const { error } = await client.from('contacts').delete().eq('id', id);

    if (error) {
      this.logger.error(`Error deleting contact ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    return { success: true, message: `Message ${id} deleted successfully` };
  }
}
