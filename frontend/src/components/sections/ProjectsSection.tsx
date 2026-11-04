'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { getProjects, Project, fallbackProjects } from '@/services/projectService';
import { Skeleton } from '@/components/ui/Skeleton';

function ProjectCardSkeleton() {
  return (
    <div className="p-8 sm:p-9 rounded-2xl bg-[#0e2c32] border border-[#1d4c55] flex flex-col justify-between min-h-[360px]">
      <div>
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-2.5 mb-4">
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-7 w-1/2" />
        </div>

        <div className="space-y-2 mt-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1d4c55]">
        <Skeleton className="h-9 w-28 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { locale, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getProjects(activeCategory)
      .then((data) => {
        if (isCurrent) {
          setProjects(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [activeCategory]);

  const categories = [
    { key: 'all', label: t('projects.filterAll') },
    { key: 'web', label: t('projects.filterWeb') },
    { key: 'mobile', label: t('projects.filterMobile') },
    { key: 'backend', label: t('projects.filterBackend') },
    { key: 'github', label: t('projects.filterGithub') },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 border-b border-[#143e46] bg-[#0b252a] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header with Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono text-[#afaeae] uppercase tracking-wider mb-3">
              {t('projects.subtitle')}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[1.05]">
              {t('projects.title')}
            </h2>
          </div>

          {/* 11x Pill Category Filter (rounded-full) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0f2f35] border border-[#1d4c55] rounded-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-full tracking-normal ${
                  activeCategory === cat.key
                    ? 'text-[#000000] font-semibold bg-white shadow-none'
                    : 'text-[#d4e6eb] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 11x Projects Gallery Grid or Skeleton Shimmer Lines */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy="true">
            {[1, 2, 3, 4].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="card-spring-hover group p-8 sm:p-9 rounded-2xl bg-[#0e2c32] border border-[#1d4c55] hover:border-[#406e7a] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#afaeae] mb-4">
                    <span className="text-[#406e7a] font-semibold">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#afaeae]">{project.category}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-[#d4e6eb] transition-colors leading-snug">
                    {project.title[locale]}
                  </h3>

                  <p className="mt-3 text-sm text-[#afaeae] leading-relaxed font-light">
                    {project.description[locale]}
                  </p>

                  {/* 11x Slate Teal tags (rounded-lg) */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#406e7a]/40 text-[#d4e6eb] border border-[#406e7a]/60 shadow-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 11x Action Buttons: White Pill Button + adjacent ghost link */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1d4c55] text-xs font-medium">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#000000] font-semibold hover:bg-[#f6f5f5] active:bg-[#ede2d7] transition-colors shadow-none"
                    >
                      <span>{t('projects.liveDemo')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#d4e6eb] hover:text-white transition-colors font-medium px-2 py-2"
                    >
                      <Github size={14} />
                      <span>{t('projects.sourceCode')}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
