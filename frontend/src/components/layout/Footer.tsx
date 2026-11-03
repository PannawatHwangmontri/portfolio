'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-[#FAFAFA] dark:bg-[#0D0F17]/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">© 2026 Pannawat Hwangmontri</p>
          <p className="mt-1 font-mono text-[11px] text-slate-400">{t('footer.builtWith')}</p>
        </div>

        <div className="flex items-center gap-5 text-slate-400">
          <a
            href="https://github.com/PannawatHwangmontri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:contact@pannawat.dev"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
