'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function TestimonialsSection() {
  const { locale, t } = useLanguage();

  const testimonials = [
    {
      id: 'test-1',
      quote: {
        th: 'พัฒนวัชร์เป็นนักพัฒนาที่มีความกระตือรือร้นและเรียนรู้ได้อย่างรวดเร็วมาก โค้ดที่ส่งมาสะอาด มีระเบียบ และใส่ใจประสบการณ์การใช้งานของผู้ใช้เสมอ',
        en: 'Pannawat is an exceptionally quick learner and proactive developer. His code is consistently clean, well-architected, and user-centric.',
      },
      author: 'Senior Software Architect',
      organization: 'Tech Partner Co.',
    },
    {
      id: 'test-2',
      quote: {
        th: 'ทำงานร่วมกันในโปรเจกต์ Monorepo ได้อย่างราบรื่นมาก สามารถจัดการโครงสร้างทั้ง Next.js และ NestJS ได้อย่างเป็นมืออาชีพ',
        en: 'Working together on monorepo projects was seamless. He managed both Next.js and NestJS layers with high architectural maturity.',
      },
      author: 'Engineering Team Lead',
      organization: 'FinTech Innovation Lab',
    },
  ];

  return (
    <section id="testimonials" className="py-20 border-b border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-muted">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-lg border-l-2 border-l-accent border border-border-subtle bg-surface-subtle flex flex-col justify-between"
            >
              <p className="text-sm text-foreground leading-relaxed font-light">
                &ldquo;{item.quote[locale]}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <p className="text-xs font-semibold text-foreground">
                  {item.author}
                </p>
                <p className="text-[11px] font-mono text-muted mt-0.5">
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
