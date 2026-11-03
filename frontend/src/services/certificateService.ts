import { fetchApi } from './api';

export interface Certificate {
  id: string;
  title: {
    th: string;
    en: string;
  };
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  category?: string;
  order: number;
}

export const fallbackCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: {
      th: 'Full-Stack Web Development Professional Certificate',
      en: 'Full-Stack Web Development Professional Certificate',
    },
    issuer: 'Coursera / Meta',
    issueDate: '2024',
    credentialUrl: 'https://coursera.org',
    category: 'Full-Stack',
    order: 1,
  },
  {
    id: 'cert-2',
    title: {
      th: 'NestJS Backend Architecture Mastery',
      en: 'NestJS Backend Architecture Mastery',
    },
    issuer: 'Official NestJS Courses',
    issueDate: '2024',
    credentialUrl: 'https://nestjs.com',
    category: 'Backend',
    order: 2,
  },
  {
    id: 'cert-3',
    title: {
      th: 'PostgreSQL Database Administration & Performance Tuning',
      en: 'PostgreSQL Database Administration & Performance Tuning',
    },
    issuer: 'Supabase Academy',
    issueDate: '2023',
    credentialUrl: 'https://supabase.com',
    category: 'Database',
    order: 3,
  },
];

export async function getCertificates(): Promise<Certificate[]> {
  try {
    return await fetchApi<Certificate[]>('/certificates');
  } catch {
    return fallbackCertificates;
  }
}

export async function createCertificate(payload: Partial<Certificate>): Promise<Certificate> {
  return fetchApi<Certificate>('/certificates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCertificate(id: string, payload: Partial<Certificate>): Promise<Certificate> {
  return fetchApi<Certificate>(`/certificates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCertificate(id: string): Promise<{ success: boolean; message: string }> {
  return fetchApi<{ success: boolean; message: string }>(`/certificates/${id}`, {
    method: 'DELETE',
  });
}
