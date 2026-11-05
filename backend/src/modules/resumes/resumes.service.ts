import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service.js';

export interface Resume {
  id: string;
  filename: string;
  url: string;
  isActive: boolean;
  createdAt: string;
}

const BUCKET = 'resumes';
const PDF_MAGIC = '%PDF-';

function mapResume(row: Record<string, any>): Resume {
  return {
    id: row.id,
    filename: row.filename,
    url: row.url,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

@Injectable()
export class ResumesService {
  private readonly logger = new Logger(ResumesService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  private fail(message: string, error: { message: string }): never {
    this.logger.error(message, error);
    throw new InternalServerErrorException(`${message}: ${error.message}`);
  }

  async findAll(): Promise<Resume[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('resumes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) this.fail('Failed to fetch resumes', error);
    return (data || []).map(mapResume);
  }

  async findActive(): Promise<Resume | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('resumes')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();
    if (error) this.fail('Failed to fetch active resume', error);
    return data ? mapResume(data) : null;
  }

  async upload(filename: string, fileBase64: string): Promise<Resume> {
    const buffer = Buffer.from(fileBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
    if (buffer.subarray(0, 5).toString('latin1') !== PDF_MAGIC) {
      throw new BadRequestException('Only PDF files are allowed');
    }

    const client = this.supabaseService.getClient();
    const id = `resume-${Date.now()}`;
    const path = `${id}.pdf`;

    const { error: upErr } = await client.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: 'application/pdf' });
    if (upErr) this.fail('Storage upload failed (does bucket "resumes" exist?)', upErr);

    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(path);
    const { error } = await client
      .from('resumes')
      .insert({ id, filename: filename || 'resume.pdf', path, url: pub.publicUrl, is_active: false });
    if (error) {
      await client.storage.from(BUCKET).remove([path]);
      this.fail('Failed to save resume', error);
    }

    return this.activate(id);
  }

  async activate(id: string): Promise<Resume> {
    const client = this.supabaseService.getClient();
    const { error: offErr } = await client.from('resumes').update({ is_active: false }).eq('is_active', true);
    if (offErr) this.fail('Failed to deactivate resumes', offErr);

    const { data, error } = await client
      .from('resumes')
      .update({ is_active: true })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) this.fail('Failed to activate resume', error);
    if (!data) throw new NotFoundException(`Resume ${id} not found`);
    return mapResume(data);
  }

  async delete(id: string): Promise<{ success: boolean }> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('resumes').delete().eq('id', id).select().maybeSingle();
    if (error) this.fail('Failed to delete resume', error);
    if (!data) throw new NotFoundException(`Resume ${id} not found`);
    await client.storage.from(BUCKET).remove([data.path]);
    return { success: true };
  }
}
