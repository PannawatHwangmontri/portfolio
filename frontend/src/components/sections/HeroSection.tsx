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
      className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-border-subtle bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Subtle Location & Status Ledger */}
          <div className="hero-reveal text-xs font-mono text-muted mb-4 flex items-center gap-2">
            <span>Bangkok, Thailand</span>
            <span className="text-border-strong">/</span>
            <span>Available for Full-Stack & Engineering Roles</span>
          </div>

          {/* Unified Architectural Headline */}
          <h1 className="hero-reveal text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-[1.15]">
            {t('hero.role')}
          </h1>

          <p className="hero-reveal mt-2.5 text-lg font-normal text-foreground">
            {t('hero.name')}
          </p>

          <p className="hero-reveal mt-4 text-base text-muted leading-relaxed max-w-2xl font-light">
            {t('hero.description')}
          </p>

          {/* Action Row */}
          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-accent-contrast text-xs font-medium hover:bg-accent-hover transition-colors"
            >
              <span>{t('hero.viewProjects')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle text-foreground text-xs font-medium hover:border-border-strong transition-colors"
            >
              <span>{t('hero.contactMe')}</span>
            </a>

            {/* Social channels as understated text-links */}
            <div className="flex items-center gap-4 ml-2 sm:ml-4 text-xs text-muted">
              <a
                href="https://github.com/PannawatHwangmontri"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
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
