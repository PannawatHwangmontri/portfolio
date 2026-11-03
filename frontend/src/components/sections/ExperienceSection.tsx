'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ExperienceItem, getExperiences } from '@/services/experienceService';

export function ExperienceSection() {
  const { locale, t } = useLanguage();
  const [items, setItems] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    getExperiences().then(setItems);
  }, []);

  const workItems = items.filter((item) => item.type === 'work');
  const eduItems = items.filter((item) => item.type === 'education');

  return (
    <section id="experience" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-400">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {/* Work Experience Ledger */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
              {t('experience.workTitle')}
            </h3>

            <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
              {workItems.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono text-slate-500">{item.period}</span>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {item.description[locale]}
                    </p>
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Ledger */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
              {t('experience.educationTitle')}
            </h3>

            <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
              {eduItems.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono text-slate-500">{item.period}</span>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {item.description[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
