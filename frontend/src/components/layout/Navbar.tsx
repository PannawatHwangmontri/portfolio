'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e1dad9]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm tracking-tight text-[#000000] flex items-center gap-2.5 group">
          <span className="w-2 h-2 rounded-full bg-[#0b252a] inline-block" />
          <span className="font-serif tracking-tight text-[17px] font-bold">Pannawat Hwangmontri</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[13px] text-[#000000]/75 font-medium tracking-normal">
          <a href="#about" className="hover:text-[#000000] transition-colors">
            {t('nav.about')}
          </a>
          <a href="#skills" className="hover:text-[#000000] transition-colors">
            {t('nav.skills')}
          </a>
          <a href="#projects" className="hover:text-[#000000] transition-colors">
            {t('nav.projects')}
          </a>
          <a href="#experience" className="hover:text-[#000000] transition-colors">
            {t('nav.experience')}
          </a>
          <a href="#certificates" className="hover:text-[#000000] transition-colors">
            {t('nav.certificates')}
          </a>
          <a href="#contact" className="hover:text-[#000000] transition-colors">
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Admin CMS Access */}
          <Link
            href="/admin"
            className="p-2 text-[#000000]/60 hover:text-[#000000] transition-colors rounded-full hover:bg-[#f6f5f5]"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Minimal Language Switcher */}
          <button
            onClick={toggleLocale}
            className="text-xs font-mono font-medium px-3 py-1 rounded-full border border-[#e1dad9] text-[#000000] hover:bg-[#f6f5f5] transition-colors cursor-pointer bg-white"
            title="Switch Language / สลับภาษา"
          >
            <span className={locale === 'th' ? 'font-bold text-[#0b252a]' : 'text-[#737373]'}>TH</span>
            <span className="mx-1 text-[#e1dad9]">/</span>
            <span className={locale === 'en' ? 'font-bold text-[#0b252a]' : 'text-[#737373]'}>EN</span>
          </button>

          {/* Resume Pill Button */}
          <a
            href={locale === 'th' ? '/resume-th.pdf' : '/resume-en.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs font-medium px-5 py-2 rounded-full bg-[#000000] text-white hover:bg-[#222222] transition-colors tracking-normal shadow-none"
          >
            {t('nav.resume')}
          </a>
        </div>
      </div>
    </header>
  );
}
