'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export function SkillsSection() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      key: 'languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5/CSS3'],
    },
    {
      key: 'frontend',
      skills: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Turbopack'],
    },
    {
      key: 'backend',
      skills: ['Node.js', 'NestJS', 'Express', 'Supabase', 'PostgreSQL', 'RESTful API'],
    },
    {
      key: 'devops',
      skills: ['Git', 'Docker', 'Railway', 'Linux', 'Postman', 'Figma'],
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {skillGroups.map((group) => (
            <Card key={group.key} className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                {t(`skills.${group.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="sky">
                    {skill}
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
