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
    <section id="skills" className="py-20 border-b border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-muted">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Technical Matrix Table */}
        <div className="border border-border-subtle divide-y divide-border-subtle rounded-lg overflow-hidden bg-surface">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-surface-subtle transition-colors"
            >
              <div className="md:col-span-4 mb-3 md:mb-0">
                <h3 className="text-sm font-semibold text-foreground">
                  {t(`skills.${group.key}`)}
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-surface-subtle text-foreground border border-border-subtle"
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
