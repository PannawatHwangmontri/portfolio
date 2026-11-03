'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, ShieldAlert, ArrowLeft } from 'lucide-react';
import { loginAdmin } from '@/services/authService';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@pannawat.dev');
  const [password, setPassword] = useState('admin1234');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await loginAdmin(email, password);
      router.push('/admin');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio / กลับหน้าหลัก</span>
        </Link>

        <Card className="p-8 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800 text-sky-600 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard Login</h1>
            <p className="text-xs text-slate-500 mt-1">ระบบจัดการข้อมูลพอร์ตโฟลิโอและกล่องข้อความ</p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="admin@pannawat.dev"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            <span>Development Account: </span>
            <span className="font-mono text-slate-600 dark:text-slate-300">admin@pannawat.dev / admin1234</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
