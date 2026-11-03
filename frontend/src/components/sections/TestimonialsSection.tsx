'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Quote } from 'lucide-react';

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
    <section id="testimonials" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {testimonials.map((item) => (
            <Card key={item.id} className="relative flex flex-col justify-between p-6">
              <Quote className="w-8 h-8 text-sky-200 dark:text-sky-900/60 mb-3" />
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{item.quote[locale]}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.author}
                </p>
                <p className="text-xs text-slate-500">
                  {item.organization}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
