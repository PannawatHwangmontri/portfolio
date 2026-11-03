import { fetchApi } from './api';

export interface AdminUser {
  id: string;
  email: string;
}

export async function loginAdmin(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
  const res = await fetchApi<{ user: AdminUser; token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', res.token);
    localStorage.setItem('admin_user', JSON.stringify(res.user));
    window.dispatchEvent(new Event('storage'));
  }

  return res;
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.dispatchEvent(new Event('storage'));
  }
}

export function getStoredAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('admin_user');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
