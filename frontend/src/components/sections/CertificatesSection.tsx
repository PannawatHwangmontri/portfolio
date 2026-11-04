'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight, Eye, X, ExternalLink } from 'lucide-react';
import { Certificate, fallbackCertificates, getCertificates } from '@/services/certificateService';

function isImageUrl(url?: string): boolean {
  if (!url) return false;
  return (
    /\.(jpg|jpeg|png|webp|gif|svg|avif)(\?.*)?$/i.test(url) ||
    url.includes('/storage/v1/object/public/certificates') ||
    url.startsWith('data:image/')
  );
}

export function CertificatesSection() {
  const { locale, t } = useLanguage();
  const [certs, setCerts] = useState<Certificate[]>(fallbackCertificates);
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    getCertificates().then(setCerts);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certificates" className="py-24 md:py-32 border-b border-[#e1dad9] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono text-[#737373] uppercase tracking-wider mb-3">
            {t('certificates.subtitle')}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#000000] tracking-[-0.04em] leading-[1.05]">
            {t('certificates.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => {
            const hasImage = isImageUrl(cert.credentialUrl);
            return (
              <div
                key={cert.id}
                className="card-spring-hover p-7 sm:p-8 rounded-2xl bg-white border border-[#e1dad9] hover:border-[#000000]/60 flex flex-col justify-between group/card"
              >
                <div>
                  {hasImage && cert.credentialUrl && (
                    <div
                      className="mb-5 overflow-hidden rounded-xl border border-[#e1dad9] bg-[#f6f5f5] aspect-video relative group cursor-pointer"
                      onClick={() => setActiveModalImage({ url: cert.credentialUrl!, title: cert.title[locale] })}
                    >
                      <img
                        src={cert.credentialUrl}
                        alt={cert.title[locale]}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0b252a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1.5 font-medium">
                        <Eye className="w-4 h-4" />
                        <span>{locale === 'th' ? 'คลิกดูรูปขนาดเต็ม' : 'View Full Image'}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-3">
                    <span>{cert.issueDate}</span>
                    {cert.category && <span className="uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#f6f5f5] text-[#000000]">{cert.category}</span>}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#000000] leading-snug group-hover:text-[#0b252a] transition-colors">
                    {cert.title[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#737373] font-normal">
                    {cert.issuer}
                  </p>
                </div>

                {cert.credentialUrl && (
                  <div className="mt-7 pt-4 border-t border-[#e1dad9] flex items-center justify-between">
                    {hasImage ? (
                      <button
                        type="button"
                        onClick={() => setActiveModalImage({ url: cert.credentialUrl!, title: cert.title[locale] })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#000000] hover:text-[#406e7a] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{locale === 'th' ? 'ดูรูปเกียรติบัตร' : 'View Certificate'}</span>
                      </button>
                    ) : (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#000000] hover:text-[#406e7a] transition-colors"
                      >
                        <span>{t('certificates.viewCredential')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal (16px rounded-2xl per 11x system) */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl overflow-hidden border border-[#e1dad9] shadow-none flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e1dad9] bg-white">
              <h4 className="font-serif text-lg font-bold text-[#000000] truncate pr-4">
                {activeModalImage.title}
              </h4>
              <button
                onClick={() => setActiveModalImage(null)}
                className="p-2 rounded-full text-[#737373] hover:text-[#000000] hover:bg-[#f6f5f5] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-4 sm:p-6 bg-[#f6f5f5] flex items-center justify-center">
              <img
                src={activeModalImage.url}
                alt={activeModalImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl border border-[#e1dad9]"
              />
            </div>
            <div className="p-4 border-t border-[#e1dad9] bg-white flex items-center justify-between text-xs text-[#737373]">
              <a
                href={activeModalImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#000000] hover:underline font-semibold"
              >
                <span>{locale === 'th' ? 'เปิดดูรูปขนาดเต็มในแท็บใหม่' : 'Open in new tab'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setActiveModalImage(null)}
                className="px-5 py-2 rounded-full bg-[#000000] text-white hover:bg-[#222222] text-xs font-semibold transition-colors cursor-pointer"
              >
                {locale === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
