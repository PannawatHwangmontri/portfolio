import { fetchApi } from './api';

export interface Resume {
  id: string;
  filename: string;
  url: string;
  isActive: boolean;
  createdAt: string;
}

export async function getActiveResume(): Promise<Resume | null> {
  try {
    return await fetchApi<Resume | null>('/resumes/active');
  } catch {
    return null;
  }
}

export const getResumes = () => fetchApi<Resume[]>('/resumes');

export function uploadResume(file: File): Promise<Resume> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      fetchApi<Resume>('/resumes', {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, fileData: reader.result }),
      }).then(resolve, reject);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const activateResume = (id: string) => fetchApi<Resume>(`/resumes/${id}/activate`, { method: 'PUT' });

export const deleteResume = (id: string) =>
  fetchApi<{ success: boolean }>(`/resumes/${id}`, { method: 'DELETE' });
