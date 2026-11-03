'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#090A0F]/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 group">
          <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" />
          <span>Pannawat Hwangmontri</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] text-slate-600 dark:text-slate-400 font-medium">
          <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.about')}
          </a>
          <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.skills')}
          </a>
          <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.projects')}
          </a>
          <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.experience')}
          </a>
          <a href="#certificates" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.certificates')}
          </a>
          <a href="#articles" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.articles')}
          </a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Admin CMS Access */}
          <Link
            href="/admin"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Minimal Language Switcher */}
          <button
            onClick={toggleLocale}
            className="text-xs font-mono font-medium px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Switch Language / สลับภาษา"
          >
            <span className={locale === 'th' ? 'font-bold text-sky-600' : ''}>TH</span>
            <span className="mx-1 text-slate-300 dark:text-slate-700">/</span>
            <span className={locale === 'en' ? 'font-bold text-sky-600' : ''}>EN</span>
          </button>

          {/* Resume Link */}
          <a
            href={locale === 'th' ? '/resume-th.pdf' : '/resume-en.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            {t('nav.resume')}
          </a>
        </div>
      </div>
    </header>
  );
}
