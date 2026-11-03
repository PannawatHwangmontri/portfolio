'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm tracking-tight text-foreground flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          <span>Pannawat Hwangmontri</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] text-muted font-medium">
          <a href="#about" className="hover:text-foreground transition-colors">
            {t('nav.about')}
          </a>
          <a href="#skills" className="hover:text-foreground transition-colors">
            {t('nav.skills')}
          </a>
          <a href="#projects" className="hover:text-foreground transition-colors">
            {t('nav.projects')}
          </a>
          <a href="#experience" className="hover:text-foreground transition-colors">
            {t('nav.experience')}
          </a>
          <a href="#certificates" className="hover:text-foreground transition-colors">
            {t('nav.certificates')}
          </a>
          <a href="#articles" className="hover:text-foreground transition-colors">
            {t('nav.articles')}
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors">
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Admin CMS Access */}
          <Link
            href="/admin"
            className="p-1.5 text-muted hover:text-foreground transition-colors rounded"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Minimal Language Switcher */}
          <button
            onClick={toggleLocale}
            className="text-xs font-mono font-medium px-2 py-1 rounded border border-border-subtle text-muted hover:text-foreground transition-colors cursor-pointer"
            title="Switch Language / สลับภาษา"
          >
            <span className={locale === 'th' ? 'font-bold text-accent' : ''}>TH</span>
            <span className="mx-1 text-border-strong">/</span>
            <span className={locale === 'en' ? 'font-bold text-accent' : ''}>EN</span>
          </button>

          {/* Resume Link */}
          <a
            href={locale === 'th' ? '/resume-th.pdf' : '/resume-en.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            {t('nav.resume')}
          </a>
        </div>
      </div>
    </header>
  );
}
