'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#FAFAFA] dark:bg-[#0D0F17]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {t('about.title')}
            </h2>
            <p className="mt-1 text-xs font-mono text-slate-400">
              {t('about.subtitle')}
            </p>

            <div className="mt-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 font-light">
              <p>{t('about.bio')}</p>
            </div>
          </div>

          {/* Right Column: Architectural Metrics Ledger */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
              <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white font-mono">03+</span>
              <p className="text-xs text-slate-500 mt-1">{t('about.statYears')}</p>
            </div>

            <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
              <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white font-mono">15+</span>
              <p className="text-xs text-slate-500 mt-1">{t('about.statProjects')}</p>
            </div>

            <div>
              <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white font-mono">05+</span>
              <p className="text-xs text-slate-500 mt-1">{t('about.statHackathons')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
