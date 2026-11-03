'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Article, getArticles } from '@/services/articleService';

export function ArticlesSection() {
  const { locale, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <section id="articles" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('articles.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('articles.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {articles.map((art) => (
            <Card key={art.id} className="flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="neutral">{art.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {art.title[locale]}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {art.summary[locale]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono">{art.publishedAt}</span>
                <a
                  href={art.url || '#'}
                  className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <span>{t('articles.readMore')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
