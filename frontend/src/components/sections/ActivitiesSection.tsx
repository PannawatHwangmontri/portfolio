'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Users } from 'lucide-react';

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
    <section id="activities" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('activities.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('activities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {activities.map((act) => (
            <Card key={act.id} className="flex flex-col justify-between border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>{act.award[locale]}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{act.year}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {act.title[locale]}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-xs text-sky-600 font-medium">
                  <Users className="w-3.5 h-3.5" />
                  <span>{act.role[locale]}</span>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {act.description[locale]}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                {act.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
