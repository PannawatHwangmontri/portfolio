'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function ActivitiesSection() {
  const { locale, t } = useLanguage();

  const activities = [
    {
      id: 'act-1',
      title: {
        th: 'National AI & Cloud Hackathon 2024',
        en: 'National AI & Cloud Hackathon 2024',
      },
      role: {
        th: 'Lead Full-Stack Developer',
        en: 'Lead Full-Stack Developer',
      },
      award: {
        th: 'รางวัลรองชนะเลิศอันดับ 1 (First Runner-Up)',
        en: 'First Runner-Up Award',
      },
      description: {
        th: 'ร่วมกับทีม 4 คน พัฒนาระบบคัดกรองข้อมูลอัจฉริยะแบบ Realtime ด้วย Next.js, FastAPI และ Vector Database ภายในเวลา 48 ชั่วโมง',
        en: 'Collaborated in a 4-person team to build an intelligent real-time data filtering platform using Next.js and FastAPI within 48 hours.',
      },
      tags: ['Hackathon', 'Next.js', 'AI', 'Cloud'],
      year: '2024',
    },
    {
      id: 'act-2',
      title: {
        th: 'Open Source Community Contributor',
        en: 'Open Source Community Contributor',
      },
      role: {
        th: 'Contributor',
        en: 'Contributor',
      },
      award: {
        th: 'Top Community Contributor',
        en: 'Top Community Contributor',
      },
      description: {
        th: 'ร่วมส่ง Pull Request แก้ไขบั๊กและปรับปรุงเอกสารให้โครงการ Open Source ยอดนิยมในไทยและสากล',
        en: 'Contributed bug fixes, performance improvements, and documentation to developer tooling open source repos.',
      },
      tags: ['Open Source', 'GitHub', 'TypeScript'],
      year: '2023 - 2025',
    },
  ];

  return (
    <section id="activities" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {t('activities.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-400">
            {t('activities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-6 sm:p-7 rounded-lg bg-white dark:bg-[#090A0F] border border-slate-200/90 dark:border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-sky-600 dark:text-sky-400 font-medium">
                    {act.award[locale]}
                  </span>
                  <span className="text-slate-400">{act.year}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {act.title[locale]}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Role: <span className="text-slate-700 dark:text-slate-300 font-medium">{act.role[locale]}</span>
                </p>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {act.description[locale]}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {act.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
