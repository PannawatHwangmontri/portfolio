import { fetchApi } from './api';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export const fallbackMessages: ContactMessage[] = [];

export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  return fetchApi<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const data = await fetchApi<ContactMessage[]>('/contact');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function deleteContactMessage(id: string): Promise<{ success: boolean; message: string }> {
  return fetchApi<{ success: boolean; message: string }>(`/contact/${id}`, {
    method: 'DELETE',
  });
}
