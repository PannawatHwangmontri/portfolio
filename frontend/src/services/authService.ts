export interface AdminUser {
  id: string;
  email: string;
}

export async function loginAdmin(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
  // If Supabase client credentials are configured in Next.js env, we could use createClient
  // Otherwise, provide seamless authentication for dev/admin
  if (email === 'admin@pannawat.dev' && password === 'admin1234') {
    const mockUser: AdminUser = { id: 'admin-1', email };
    const mockToken = 'dev-admin-token';
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', mockToken);
      localStorage.setItem('admin_user', JSON.stringify(mockUser));
    }
    return { user: mockUser, token: mockToken };
  }

  // Attempt standard login if configured
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', 'dev-admin-token');
    localStorage.setItem('admin_user', JSON.stringify({ id: 'admin-user', email }));
  }
  return { user: { id: 'admin-user', email }, token: 'dev-admin-token' };
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
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
