'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Article, getArticles } from '@/services/articleService';

export function ArticlesSection() {
  const { locale, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <section id="articles" className="py-20 border-b border-border-subtle bg-surface-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {t('articles.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-muted">
            {t('articles.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="p-6 sm:p-7 rounded-lg bg-surface border border-border-subtle hover:border-border-strong transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                  <span>{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {art.title[locale]}
                </h3>

                <p className="mt-2.5 text-sm text-muted leading-relaxed font-light">
                  {art.summary[locale]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="font-mono text-muted">{art.publishedAt}</span>
                <a
                  href={art.url || '#'}
                  className="inline-flex items-center gap-1 font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>{t('articles.readMore')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
