'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Award, Briefcase, Code } from 'lucide-react';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('about.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('about.subtitle')}
          </p>

          <p className="mt-6 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('about.bio')}
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">3+</p>
              <p className="text-xs text-slate-500">{t('about.statYears')}</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">15+</p>
              <p className="text-xs text-slate-500">{t('about.statProjects')}</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">5+</p>
              <p className="text-xs text-slate-500">{t('about.statHackathons')}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
