'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p>© 2026 Pannawat Hwangmontri. {t('footer.rights')}</p>
          <p className="mt-1 text-slate-400">{t('footer.builtWith')}</p>
        </div>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <a
            href="https://github.com/PannawatHwangmontri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@pannawat.dev"
            className="hover:text-sky-600 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
