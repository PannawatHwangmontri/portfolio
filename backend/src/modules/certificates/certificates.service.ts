import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { Certificate, initialCertificates } from './certificates.data.js';

@Injectable()
export class CertificatesService {
  private readonly logger = new Logger(CertificatesService.name);
  private memoryCertificates: Certificate[] = [...initialCertificates];

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Certificate[]> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('certificates').select('*').order('order', { ascending: true });
        if (!error && data && data.length > 0) return data as Certificate[];
      } catch (err) {
        this.logger.warn('Failed to fetch certificates from Supabase', err);
      }
    }
    return this.memoryCertificates;
  }

  async findOne(id: string): Promise<Certificate> {
    const found = this.memoryCertificates.find((c) => c.id === id);
    if (!found) throw new NotFoundException(`Certificate ${id} not found`);
    return found;
  }

  async create(payload: Partial<Certificate>): Promise<Certificate> {
    const newCert: Certificate = {
      id: payload.id || `cert-${Date.now()}`,
      title: payload.title || { th: 'ใบรับรองใหม่', en: 'New Certificate' },
      issuer: payload.issuer || '',
      issueDate: payload.issueDate || '2025',
      credentialUrl: payload.credentialUrl || '',
      category: payload.category || 'General',
      order: payload.order ?? this.memoryCertificates.length + 1,
    };

    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('certificates').insert(newCert).select().single();
        if (!error && data) return data as Certificate;
      } catch (err) {
        this.logger.error('Error inserting certificate to Supabase', err);
      }
    }

    this.memoryCertificates.unshift(newCert);
    return newCert;
  }

  async update(id: string, payload: Partial<Certificate>): Promise<Certificate> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        const { data, error } = await client.from('certificates').update(payload).eq('id', id).select().single();
        if (!error && data) return data as Certificate;
      } catch (err) {
        this.logger.error(`Error updating certificate ${id} on Supabase`, err);
      }
    }

    const index = this.memoryCertificates.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Certificate ${id} not found`);

    this.memoryCertificates[index] = { ...this.memoryCertificates[index], ...payload };
    return this.memoryCertificates[index];
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    if (client) {
      try {
        await client.from('certificates').delete().eq('id', id);
      } catch (err) {
        this.logger.error(`Error deleting certificate ${id} on Supabase`, err);
      }
    }

    const index = this.memoryCertificates.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Certificate ${id} not found`);

    this.memoryCertificates.splice(index, 1);
    return { success: true, message: `Certificate ${id} deleted successfully` };
  }
}
