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
    <section id="experience" className="py-24 md:py-32 border-b border-[#e1dad9] bg-[#f5ece5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono text-[#737373] uppercase tracking-wider mb-3">
            {t('experience.subtitle')}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#000000] tracking-[-0.04em] leading-[1.05]">
            {t('experience.title')}
          </h2>
        </div>

        <div className="space-y-16">
          {/* Work Experience Ledger */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#737373] mb-6">
              {t('experience.workTitle')}
            </h3>

            <div className="border-t border-[#e1dad9] divide-y divide-[#e1dad9]">
              {workItems.map((item) => (
                <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4">
                    <span className="text-xs font-mono text-[#737373] block">{item.period}</span>
                    <p className="font-serif text-base font-bold text-[#000000] mt-1">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#000000] tracking-tight">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-base text-[#222222] leading-relaxed font-normal">
                      {item.description[locale]}
                    </p>
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-white text-[#000000] border border-[#e1dad9]"
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
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#737373] mb-6">
              {t('experience.educationTitle')}
            </h3>

            <div className="border-t border-[#e1dad9] divide-y divide-[#e1dad9]">
              {eduItems.map((item) => (
                <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4">
                    <span className="text-xs font-mono text-[#737373] block">{item.period}</span>
                    <p className="font-serif text-base font-bold text-[#000000] mt-1">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#000000] tracking-tight">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-base text-[#222222] leading-relaxed font-normal">
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
