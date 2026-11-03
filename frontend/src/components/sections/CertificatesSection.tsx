'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, ExternalLink } from 'lucide-react';
import { Certificate, getCertificates } from '@/services/certificateService';

export function CertificatesSection() {
  const { locale, t } = useLanguage();
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    getCertificates().then(setCerts);
  }, []);

  return (
    <section id="certificates" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('certificates.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('certificates.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {certs.map((cert) => (
            <Card key={cert.id} className="flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.category && <Badge variant="neutral">{cert.category}</Badge>}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cert.title[locale]}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {cert.issuer} • <span className="font-mono">{cert.issueDate}</span>
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    <span>{t('certificates.viewCredential')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
