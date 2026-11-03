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
    <section id="certificates" className="py-20 border-b border-border-subtle bg-surface-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {t('certificates.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-muted">
            {t('certificates.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-lg bg-surface border border-border-subtle hover:border-border-strong transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                  <span>{cert.issueDate}</span>
                  {cert.category && <span>{cert.category}</span>}
                </div>

                <h3 className="text-sm font-semibold text-foreground leading-snug">
                  {cert.title[locale]}
                </h3>
                <p className="mt-1.5 text-xs text-muted font-light">
                  {cert.issuer}
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-accent transition-colors"
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
