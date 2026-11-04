'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AboutContent, fallbackSiteContent, getSiteContent } from '@/services/profileService';

export function AboutSection() {
  const { locale, t } = useLanguage();
  const [about, setAbout] = useState<AboutContent>(fallbackSiteContent.about);

  useEffect(() => {
    getSiteContent().then((content) => {
      if (content?.about) {
        setAbout(content.about);
      }
    });
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 border-b border-[#e1dad9] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-[#737373] uppercase tracking-wider mb-3">
              {about.subtitle[locale] || t('about.subtitle')}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#000000] tracking-[-0.04em] leading-[1.05]">
              {about.title[locale] || t('about.title')}
            </h2>

            <div className="mt-8 text-base sm:text-lg text-[#222222] leading-relaxed space-y-4 font-normal">
              <p>{about.bio[locale] || t('about.bio')}</p>
            </div>
          </div>

          {/* Right Column: Architectural Metrics Ledger in Sandstone & Bone */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="p-8 rounded-2xl bg-[#f6f5f5] border border-[#e1dad9] shadow-none">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#000000] tracking-tight block">
                {about.statYears || '03+'}
              </span>
              <p className="text-xs font-mono text-[#737373] mt-2 uppercase tracking-wide">
                {about.statYearsLabel?.[locale] || t('about.statYears')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f5ece5] border border-[#e1dad9] shadow-none">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#000000] tracking-tight block">
                {about.statProjects || '15+'}
              </span>
              <p className="text-xs font-mono text-[#737373] mt-2 uppercase tracking-wide">
                {about.statProjectsLabel?.[locale] || t('about.statProjects')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
