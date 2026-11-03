'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import th from '../locales/th.json';
import en from '../locales/en.json';

type Locale = 'th' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, unknown>> = { th, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('th');

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'th' ? 'en' : 'th'));
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: unknown = translations[locale];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
