'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.hero-animate', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="hero-animate inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Open for Opportunities & Collaborations</span>
          </div>

          <h1 className="hero-animate text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('hero.greeting')}{' '}
            <span className="text-sky-600 dark:text-sky-400">{t('hero.name')}</span>
          </h1>

          <p className="hero-animate mt-3 text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
            {t('hero.role')}
          </p>

          <p className="hero-animate mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            {t('hero.description')}
          </p>

          <div className="hero-animate mt-8 flex flex-wrap items-center gap-4">
            <a href="#projects">
              <Button variant="primary" size="lg" className="gap-2">
                <span>{t('hero.viewProjects')}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                {t('hero.contactMe')}
              </Button>
            </a>
          </div>

          <div className="hero-animate mt-10 flex items-center gap-5 text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Connect:</span>
            <a
              href="https://github.com/PannawatHwangmontri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@pannawat.dev"
              className="hover:text-sky-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
