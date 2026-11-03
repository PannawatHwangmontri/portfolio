'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, Copy, Mail, Send, AlertCircle } from 'lucide-react';
import { submitContact } from '@/services/contactService';

export function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'contact@pannawat.dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSending(true);

    try {
      await submitContact(formData);
      setSentSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSentSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send message';
      setErrorMsg(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Option 1: Direct Contact Card */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="inline-flex p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 mb-4 border border-sky-100 dark:border-sky-800">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('contact.directEmail')}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {email}
              </p>
            </div>

            <div className="mt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCopy}
                className="gap-2 w-full sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">{t('contact.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t('contact.copyEmail')}</span>
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Option 2: Contact Form */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {sentSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-600 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t('contact.sentSuccess')}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full gap-2"
                disabled={sending}
              >
                {sending ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.sendButton')}</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
