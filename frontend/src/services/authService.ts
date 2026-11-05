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

export function startGoogleLogin() {
  const redirectTo = `${window.location.origin}/admin/auth/callback`;
  window.location.href =
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=google` +
    `&redirect_to=${encodeURIComponent(redirectTo)}`;
}

// Called on the OAuth callback with the Supabase access token; backend checks admin allowlist.
export async function completeGoogleLogin(token: string): Promise<AdminUser> {
  localStorage.setItem('admin_token', token);
  try {
    const user = await fetchApi<AdminUser>('/auth/me');
    localStorage.setItem('admin_user', JSON.stringify(user));
    window.dispatchEvent(new Event('storage'));
    return user;
  } catch (err) {
    localStorage.removeItem('admin_token');
    throw err;
  }
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
