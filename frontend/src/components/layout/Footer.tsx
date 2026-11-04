'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#143e46] bg-[#081d21] py-12 text-[#afaeae]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs">
        <div>
          <p className="font-serif text-sm font-bold text-white tracking-tight">© 2026 Pannawat Hwangmontri</p>
          <p className="mt-1.5 font-mono text-[11px] text-[#afaeae]">{t('footer.builtWith')}</p>
        </div>

        <div className="flex items-center gap-6 text-[#afaeae]">
          <a
            href="https://github.com/PannawatHwangmontri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:contact@pannawat.dev"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
