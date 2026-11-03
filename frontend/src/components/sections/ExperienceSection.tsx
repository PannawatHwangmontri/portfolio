'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, GraduationCap } from 'lucide-react';
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
    <section id="experience" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('experience.workTitle')}
              </h3>
            </div>

            <div className="space-y-4">
              {workItems.map((item) => (
                <Card key={item.id} className="relative pl-6 border-l-4 border-l-sky-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.organization[locale]}
                    </span>
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-medium">{item.period}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title[locale]}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description[locale]}
                  </p>
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="neutral">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 border border-sky-100 dark:border-sky-800">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('experience.educationTitle')}
              </h3>
            </div>

            <div className="space-y-4">
              {eduItems.map((item) => (
                <Card key={item.id} className="relative pl-6 border-l-4 border-l-emerald-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.organization[locale]}
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{item.period}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title[locale]}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description[locale]}
                  </p>
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="neutral">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
