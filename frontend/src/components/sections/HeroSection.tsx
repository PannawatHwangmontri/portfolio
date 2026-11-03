'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090A0F]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Subtle Location & Status Ledger */}
          <div className="hero-reveal text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
            <span>Bangkok, Thailand</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span>Available for Full-Stack & Engineering Roles</span>
          </div>

          {/* Unified Architectural Headline */}
          <h1 className="hero-reveal text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {t('hero.role')}
          </h1>

          <p className="hero-reveal mt-3 text-lg font-normal text-slate-700 dark:text-slate-300">
            {t('hero.name')}
          </p>

          <p className="hero-reveal mt-5 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-light">
            {t('hero.description')}
          </p>

          {/* Action Row */}
          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <span>{t('hero.viewProjects')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <span>{t('hero.contactMe')}</span>
            </a>

            {/* Social channels as understated text-links */}
            <div className="flex items-center gap-4 ml-2 sm:ml-4 text-xs text-slate-500 dark:text-slate-400">
              <a
                href="https://github.com/PannawatHwangmontri"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
