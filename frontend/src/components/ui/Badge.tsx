import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sky' | 'neutral';
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'sky',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-mono',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
