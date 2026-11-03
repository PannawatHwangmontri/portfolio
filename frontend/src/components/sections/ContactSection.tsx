'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Copy, AlertCircle, ArrowUpRight } from 'lucide-react';
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
    <section id="contact" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {t('contact.title')}
            </h2>
            <p className="mt-1 text-xs font-mono text-slate-400">
              {t('contact.subtitle')}
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-5 rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-[#FAFAFA] dark:bg-[#0D0F17]/50">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t('contact.directEmail')}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-900 dark:text-white font-mono">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-medium px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">{t('contact.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>{t('contact.copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-light leading-relaxed">
                Typically responds within 24–48 hours for engineering inquiries, freelance systems, or collaboration opportunities.
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-[#FAFAFA] dark:bg-[#0D0F17]/50 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {sentSuccess && (
                <div className="p-3 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-600 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t('contact.sentSuccess')}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090A0F] focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090A0F] focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090A0F] focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-2 py-2.5 px-4 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    <span>{t('contact.sendButton')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
