'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
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
  ];

  return (
    <section id="projects" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {project.title[locale]}
                  </h3>
                  <Badge variant="neutral">{project.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description[locale]}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('projects.liveDemo')}</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{t('projects.sourceCode')}</span>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
