'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Certificate, getCertificates } from '@/services/certificateService';

export function CertificatesSection() {
  const { locale, t } = useLanguage();
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    getCertificates().then(setCerts);
  }, []);

  return (
    <section id="certificates" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#FAFAFA] dark:bg-[#0D0F17]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {t('certificates.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-400">
            {t('certificates.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-lg bg-white dark:bg-[#090A0F] border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span>{cert.issueDate}</span>
                  {cert.category && <span>{cert.category}</span>}
                </div>

                <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  {cert.title[locale]}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 font-light">
                  {cert.issuer}
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>{t('certificates.viewCredential')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
