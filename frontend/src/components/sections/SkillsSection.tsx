'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function SkillsSection() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      key: 'languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      key: 'frontend',
      skills: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Turbopack'],
    },
    {
      key: 'backend',
      skills: ['NestJS', 'Node.js', 'Supabase', 'PostgreSQL', 'RESTful API', 'RLS Security'],
    },
    {
      key: 'devops',
      skills: ['Docker', 'Git & GitHub', 'Railway', 'Linux', 'CI/CD', 'Postman'],
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-400">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Technical Matrix Table */}
        <div className="border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 rounded-lg overflow-hidden bg-white dark:bg-[#0D0F17]/40">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors"
            >
              <div className="md:col-span-4 mb-3 md:mb-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t(`skills.${group.key}`)}
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {skill}
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
