'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Copy, AlertCircle, ArrowUpRight } from 'lucide-react';
import { submitContact } from '@/services/contactService';
import { ContactInfoContent, fallbackSiteContent, getSiteContent } from '@/services/profileService';

export function ContactSection() {
  const { locale, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactInfo, setContactInfo] = useState<ContactInfoContent>(fallbackSiteContent.contactInfo);

  useEffect(() => {
    getSiteContent().then((content) => {
      if (content?.contactInfo) {
        setContactInfo(content.contactInfo);
      }
    });
  }, []);

  const email = contactInfo.email || 'contact@pannawat.dev';

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
    <section id="contact" className="py-24 md:py-32 border-b border-[#143e46] bg-[#0b252a] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono text-[#afaeae] uppercase tracking-wider mb-3">
              {t('contact.subtitle')}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[1.05]">
              {t('contact.title')}
            </h2>

            <div className="mt-8 space-y-6">
              <div className="p-7 sm:p-8 rounded-2xl border border-[#1d4c55] bg-[#0e2c32] shadow-none">
                <span className="text-xs font-mono text-[#afaeae] uppercase tracking-wider block mb-2">
                  {t('contact.directEmail')}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white font-mono break-all">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-medium px-4 py-2 rounded-full border border-[#1d4c55] hover:border-[#406e7a] hover:bg-[#143e46] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer bg-[#081d21] text-white shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#d4e6eb]" />
                        <span className="text-[#d4e6eb] font-semibold">{t('contact.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#afaeae]" />
                        <span className="text-white">{t('contact.copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#afaeae] font-normal leading-relaxed">
                {contactInfo.responseNote?.[locale] ||
                  'Typically responds within 24 to 48 hours for engineering inquiries, freelance systems, or collaboration opportunities.'}
              </div>
            </div>
          </div>

          {/* Right Column: 11x Architectural Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl border border-[#1d4c55] bg-[#0e2c32] shadow-none space-y-5">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-[#e7d3bf]/20 border border-[#e7d3bf]/40 text-xs text-[#e7d3bf] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {sentSuccess && (
                <div className="p-4 rounded-xl bg-[#d4e6eb]/20 border border-[#d4e6eb]/40 text-xs text-[#d4e6eb] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t('contact.sentSuccess')}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#afaeae] mb-2 uppercase tracking-wide font-mono">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#1d4c55] bg-[#081d21] text-white placeholder-[#737373] focus:outline-none focus:border-[#406e7a] focus:ring-1 focus:ring-[#406e7a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#afaeae] mb-2 uppercase tracking-wide font-mono">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#1d4c55] bg-[#081d21] text-white placeholder-[#737373] focus:outline-none focus:border-[#406e7a] focus:ring-1 focus:ring-[#406e7a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#afaeae] mb-2 uppercase tracking-wide font-mono">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#1d4c55] bg-[#081d21] text-white placeholder-[#737373] focus:outline-none focus:border-[#406e7a] focus:ring-1 focus:ring-[#406e7a] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-4 py-3.5 px-7 rounded-full bg-white text-[#000000] text-sm font-semibold hover:bg-[#f6f5f5] active:bg-[#ede2d7] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 tracking-normal shadow-none"
              >
                {sending ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    <span>{t('contact.sendButton')}</span>
                    <ArrowUpRight className="w-4 h-4" />
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
