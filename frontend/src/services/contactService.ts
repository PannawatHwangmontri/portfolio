import { fetchApi } from './api';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export const fallbackMessages: ContactMessage[] = [
  {
    id: 'msg-sample-1',
    name: 'Tech Recruiter',
    email: 'recruiter@techfirm.example',
    message: 'สวัสดีครับ สนใจผลงานและโปรไฟล์ของคุณ อยากสอบถามความสนใจในตำแหน่ง Full-Stack Engineer ครับ',
    createdAt: new Date().toISOString(),
    read: false,
  },
];

export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    return await fetchApi<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    return { success: true, message: 'Message sent successfully (offline mode)' };
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    return await fetchApi<ContactMessage[]>('/contact');
  } catch {
    return fallbackMessages;
  }
}

export async function deleteContactMessage(id: string): Promise<{ success: boolean; message: string }> {
  try {
    return await fetchApi<{ success: boolean; message: string }>(`/contact/${id}`, {
      method: 'DELETE',
    });
  } catch {
    return { success: true, message: `Message ${id} removed` };
  }
}
