import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-200 hover:border-sky-300 dark:hover:border-sky-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
