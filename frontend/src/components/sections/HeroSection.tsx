'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { HeroShaderBackground } from '@/components/ui/HeroShaderBackground';
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
      id="hero"
      ref={heroRef}
      className="relative pt-24 pb-20 md:pt-36 md:pb-32 border-b border-[#143e46] bg-[#0b252a] overflow-hidden text-white"
    >
      {/* GLSL WebGL Background (Warm Sunset Embers over Deep Teal) */}
      <HeroShaderBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">
          {/* Status Ledger */}
          <div className="hero-reveal text-xs font-mono text-[#afaeae] mb-6 flex flex-wrap items-center gap-2.5 tracking-wider">
            <span className="text-white/90">BANGKOK, TH</span>
            <span className="text-[#406e7a]">/</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#406e7a]/40 text-[#d4e6eb] border border-[#406e7a]/60 text-[11px] font-mono">
              AVAILABLE FOR ENGINEERING ROLES
            </span>
          </div>

          {/* Monumental 11x Serif Headline (74-100px with -0.04em tracking) */}
          <h1 className="hero-reveal font-serif text-5xl sm:text-7xl lg:text-[88px] font-bold text-white tracking-[-0.04em] leading-[0.96]">
            {t('hero.role')}
          </h1>

          {/* Editorial Name Subheading */}
          <p className="hero-reveal mt-5 font-serif text-2xl sm:text-3xl font-medium text-white/85 tracking-[-0.02em] leading-snug">
            {t('hero.name')}
          </p>

          <p className="hero-reveal mt-6 text-base sm:text-lg text-[#afaeae] leading-relaxed max-w-2xl font-light">
            {t('hero.description')}
          </p>

          {/* 11x Pill Button Action Row: White primary pill + adjacent ghost link */}
          <div className="hero-reveal mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#000000] text-sm font-semibold hover:bg-[#f6f5f5] active:bg-[#ede2d7] transition-colors shadow-none"
            >
              <span>{t('hero.viewProjects')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-[#d4e6eb] hover:text-white transition-colors"
            >
              <span>{t('hero.contactMe')} &rarr;</span>
            </a>

            {/* Social channels as understated text-links */}
            <div className="flex items-center gap-5 sm:ml-4 text-xs text-[#afaeae]">
              <a
                href="https://github.com/PannawatHwangmontri"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
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
