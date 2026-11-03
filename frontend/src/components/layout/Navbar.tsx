'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { FileDown, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
          Pannawat<span className="text-sky-600">.H</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <a href="#about" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.about')}
          </a>
          <a href="#skills" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.skills')}
          </a>
          <a href="#projects" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.projects')}
          </a>
          <a href="#experience" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.experience')}
          </a>
          <a href="#certificates" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.certificates')}
          </a>
          <a href="#articles" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.articles')}
          </a>
          <a href="#contact" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Admin Link */}
          <Link
            href="/admin"
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-600 hover:border-sky-300 transition-colors"
            title="Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>

          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-sky-400 transition-colors cursor-pointer"
            title="Switch Language / สลับภาษา"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span className={locale === 'th' ? 'text-sky-600 font-bold' : ''}>TH</span>
            <span>/</span>
            <span className={locale === 'en' ? 'text-sky-600 font-bold' : ''}>EN</span>
          </button>

          {/* Resume Download CTA */}
          <a
            href={locale === 'th' ? '/resume-th.pdf' : '/resume-en.pdf'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5 text-xs">
              <FileDown className="w-3.5 h-3.5" />
              <span>{t('nav.resume')}</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
