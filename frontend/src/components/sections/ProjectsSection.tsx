'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { getProjects, Project } from '@/services/projectService';

export function ProjectsSection() {
  const { locale, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    getProjects(activeCategory).then(setProjects);
  }, [activeCategory]);

  const categories = [
    { key: 'all', label: t('projects.filterAll') },
    { key: 'web', label: t('projects.filterWeb') },
    { key: 'mobile', label: t('projects.filterMobile') },
    { key: 'backend', label: t('projects.filterBackend') },
    { key: 'github', label: t('projects.filterGithub') },
  ];

  return (
    <section id="projects" className="py-20 border-b border-border-subtle bg-surface-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="mt-1 text-xs font-mono text-muted">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Understated Category Filter */}
          <div className="flex items-center gap-1 border-b border-border-subtle pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer rounded ${
                  activeCategory === cat.key
                    ? 'text-foreground font-semibold bg-surface border border-border-subtle'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group p-6 sm:p-7 rounded-lg bg-surface border border-border-subtle hover:border-border-strong transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                  <span>{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="text-[11px] font-mono text-muted">{project.category}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                  {project.title[locale]}
                </h3>

                <p className="mt-2.5 text-sm text-muted leading-relaxed font-light">
                  {project.description[locale]}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-muted border border-border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-5 mt-7 pt-4 border-t border-border-subtle text-xs font-medium">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:text-accent font-medium transition-colors"
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
                    className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Github size={13} />
                    <span>{t('projects.sourceCode')}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
