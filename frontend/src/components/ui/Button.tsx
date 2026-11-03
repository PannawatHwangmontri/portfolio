import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

  const variants = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 shadow-none rounded-lg',
    secondary: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-lg',
    outline: 'border border-sky-500 text-sky-600 hover:bg-sky-50 rounded-lg',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-4 py-2 h-10',
    lg: 'text-base px-6 py-2.5 h-12',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
