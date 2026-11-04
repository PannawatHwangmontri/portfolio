'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fallbackSiteContent, getSiteContent, SkillsContent } from '@/services/profileService';

const PASTEL_THEMES = [
  {
    wallClass: 'bg-[#e7d3bf] border-[#d8beaa] text-[#4c312b]',
    titleClass: 'text-[#4c312b]',
    tagClass: 'bg-white/80 text-[#4c312b] border-[#d8beaa]',
  },
  {
    wallClass: 'bg-[#c5d5e8] border-[#b0c4db] text-[#1e3448]',
    titleClass: 'text-[#1e3448]',
    tagClass: 'bg-white/80 text-[#1e3448] border-[#b0c4db]',
  },
  {
    wallClass: 'bg-[#efe5f9] border-[#ded0ed] text-[#3c2a50]',
    titleClass: 'text-[#3c2a50]',
    tagClass: 'bg-white/80 text-[#3c2a50] border-[#ded0ed]',
  },
  {
    wallClass: 'bg-[#d4e6eb] border-[#bed7dd] text-[#0b252a]',
    titleClass: 'text-[#0b252a]',
    tagClass: 'bg-white/80 text-[#0b252a] border-[#bed7dd]',
  },
];

export function SkillsSection() {
  const { locale, t } = useLanguage();
  const [skillsContent, setSkillsContent] = useState<SkillsContent>(fallbackSiteContent.skills);

  useEffect(() => {
    getSiteContent().then((content) => {
      if (content?.skills) {
        setSkillsContent(content.skills);
      }
    });
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-[#e1dad9] bg-[#f6f5f5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono text-[#737373] uppercase tracking-wider mb-3">
            {skillsContent.subtitle[locale] || t('skills.subtitle')}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#000000] tracking-[-0.04em] leading-[1.05]">
            {skillsContent.title[locale] || t('skills.title')}
          </h2>
        </div>

        {/* 11x Sun-bleached Pastel Feature Cards (16px rounded-2xl) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsContent.groups.map((group, idx) => {
            const theme = PASTEL_THEMES[idx % PASTEL_THEMES.length];
            return (
              <div
                key={group.id}
                className={`card-spring-hover p-8 sm:p-9 rounded-2xl border flex flex-col justify-between ${theme.wallClass}`}
              >
                <div>
                  <h3 className={`font-serif text-2xl font-bold tracking-tight mb-4 ${theme.titleClass}`}>
                    {group.name[locale] || t(`skills.${group.id}`) || group.name.en}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border tracking-tight shadow-none ${theme.tagClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
