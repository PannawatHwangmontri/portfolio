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
    <section id="experience" className="py-20 border-b border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-muted">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {/* Work Experience Ledger */}
          <div>
            <h3 className="text-xs font-mono text-muted mb-6">
              {t('experience.workTitle')}
            </h3>

            <div className="border-t border-border-subtle divide-y divide-border-subtle">
              {workItems.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono text-muted">{item.period}</span>
                    <p className="text-xs font-medium text-foreground mt-0.5">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2 text-sm text-muted leading-relaxed font-light">
                      {item.description[locale]}
                    </p>
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-muted border border-border-subtle"
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
            <h3 className="text-xs font-mono text-muted mb-6">
              {t('experience.educationTitle')}
            </h3>

            <div className="border-t border-border-subtle divide-y divide-border-subtle">
              {eduItems.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono text-muted">{item.period}</span>
                    <p className="text-xs font-medium text-foreground mt-0.5">
                      {item.organization[locale]}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title[locale]}
                    </h4>
                    <p className="mt-2 text-sm text-muted leading-relaxed font-light">
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
