import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal' | 'violet' | 'blue' | 'dark';
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
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b252a] disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-full tracking-normal';

  const variants = {
    primary: 'bg-[#000000] text-white hover:bg-[#222222] active:bg-[#333333] shadow-none border border-transparent',
    dark: 'bg-white text-[#000000] hover:bg-[#f6f5f5] active:bg-[#ede2d7] shadow-none border border-transparent',
    teal: 'bg-[#0b252a] text-white hover:bg-[#143e46] active:bg-[#06181b] shadow-none border border-transparent',
    violet: 'bg-[#406e7a] text-white hover:bg-[#325761] active:bg-[#25424a] shadow-none border border-transparent',
    blue: 'bg-[#000000] text-white hover:bg-[#222222] shadow-none border border-transparent',
    secondary: 'bg-[#f5ece5] text-[#000000] border border-[#e1dad9] hover:bg-[#ede2d7] shadow-none',
    outline: 'border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white shadow-none',
    ghost: 'text-inherit hover:bg-black/5 shadow-none',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-3.5',
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
