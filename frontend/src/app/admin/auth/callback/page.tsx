'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { completeGoogleLogin } from '@/services/authService';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');
    if (!token) {
      setError(params.get('error_description') || 'Google login failed');
      return;
    }
    window.history.replaceState(null, '', window.location.pathname);
    completeGoogleLogin(token)
      .then(() => router.replace('/admin'))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Google login failed')
      );
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-background text-sm text-muted">
      {error ? (
        <>
          <p className="text-rose-600 mb-3">{error}</p>
          <Link href="/admin/login" className="text-accent hover:underline">
            กลับหน้าล็อกอิน / Back to login
          </Link>
        </>
      ) : (
        <p>Signing in with Google...</p>
      )}
    </div>
  );
}
