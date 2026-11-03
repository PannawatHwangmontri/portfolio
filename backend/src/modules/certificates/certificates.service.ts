import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';
import { Certificate } from './certificates.data.js';

function mapCertificateFromDb(row: Record<string, any>): Certificate {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date ?? row.issueDate ?? '',
    credentialUrl: row.credential_url ?? row.credentialUrl ?? '',
    category: row.category ?? 'General',
    order: row.order ?? 0,
  };
}

function mapCertificateToDb(payload: Partial<Certificate>): Record<string, any> {
  const row: Record<string, any> = {};
  if (payload.id !== undefined) row.id = payload.id;
  if (payload.title !== undefined) row.title = payload.title;
  if (payload.issuer !== undefined) row.issuer = payload.issuer;
  if (payload.issueDate !== undefined) row.issue_date = payload.issueDate;
  if (payload.credentialUrl !== undefined) row.credential_url = payload.credentialUrl;
  if (payload.category !== undefined) row.category = payload.category;
  if (payload.order !== undefined) row.order = payload.order;
  return row;
}

@Injectable()
export class CertificatesService {
  private readonly logger = new Logger(CertificatesService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Certificate[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('certificates').select('*').order('order', { ascending: true });

    if (error) {
      this.logger.error('Failed to fetch certificates from Supabase', error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    return (data || []).map(mapCertificateFromDb);
  }

  async findOne(id: string): Promise<Certificate> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('certificates').select('*').eq('id', id).maybeSingle();

    if (error) {
      this.logger.error(`Failed to fetch certificate ${id} from Supabase`, error);
      throw new InternalServerErrorException(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException(`Certificate ${id} not found`);
    }

    return mapCertificateFromDb(data);
  }

  async create(payload: Partial<Certificate>): Promise<Certificate> {
    const client = this.supabaseService.getClient();
    const newId = payload.id || `cert-${Date.now()}`;
    const dbPayload = mapCertificateToDb({
      ...payload,
      id: newId,
      title: payload.title || { th: 'ใบรับรองใหม่', en: 'New Certificate' },
      issuer: payload.issuer || '',
      issueDate: payload.issueDate || '2025',
      credentialUrl: payload.credentialUrl || '',
      category: payload.category || 'General',
      order: payload.order ?? 1,
    });

    const { data, error } = await client.from('certificates').insert(dbPayload).select().single();
    if (error || !data) {
      this.logger.error('Error inserting certificate to Supabase', error);
      throw new InternalServerErrorException(error?.message || 'Failed to create certificate');
    }

    return mapCertificateFromDb(data);
  }

  async update(id: string, payload: Partial<Certificate>): Promise<Certificate> {
    const client = this.supabaseService.getClient();
    const dbPayload = mapCertificateToDb(payload);

    const { data, error } = await client.from('certificates').update(dbPayload).eq('id', id).select().maybeSingle();
    if (error) {
      this.logger.error(`Error updating certificate ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Certificate ${id} not found`);
    }

    return mapCertificateFromDb(data);
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.supabaseService.getClient();
    const { error } = await client.from('certificates').delete().eq('id', id);

    if (error) {
      this.logger.error(`Error deleting certificate ${id} on Supabase`, error);
      throw new InternalServerErrorException(error.message);
    }

    return { success: true, message: `Certificate ${id} deleted successfully` };
  }
}
