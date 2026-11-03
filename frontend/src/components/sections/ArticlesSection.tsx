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
    <section id="articles" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#FAFAFA] dark:bg-[#0D0F17]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {t('articles.title')}
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-400">
            {t('articles.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="p-6 sm:p-7 rounded-lg bg-white dark:bg-[#090A0F] border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span>{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                  {art.title[locale]}
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {art.summary[locale]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">{art.publishedAt}</span>
                <a
                  href={art.url || '#'}
                  className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
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
