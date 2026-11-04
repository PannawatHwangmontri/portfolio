import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'neutral'
    | 'slate-teal'
    | 'dusty-sky'
    | 'mist-mint'
    | 'wisteria'
    | 'desert-clay'
    | 'sky'
    | 'teal'
    | 'violet'
    | 'peach'
    | 'mint'
    | 'lavender';
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'neutral',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    'slate-teal': 'bg-[#406e7a] text-white border-transparent',
    'dusty-sky': 'bg-[#c5d5e8] text-[#000000] border-[#b0c4db]',
    'mist-mint': 'bg-[#d4e6eb] text-[#0b252a] border-[#bed7dd]',
    'wisteria': 'bg-[#efe5f9] text-[#000000] border-[#ded0ed]',
    'desert-clay': 'bg-[#e7d3bf] text-[#4c312b] border-[#d8beaa]',
    neutral: 'bg-[#f6f5f5] text-[#000000] border-[#e1dad9]',
    sky: 'bg-[#c5d5e8] text-[#000000] border-[#b0c4db]',
    teal: 'bg-[#406e7a] text-white border-transparent',
    violet: 'bg-[#efe5f9] text-[#000000] border-[#ded0ed]',
    peach: 'bg-[#e7d3bf] text-[#4c312b] border-[#d8beaa]',
    mint: 'bg-[#d4e6eb] text-[#0b252a] border-[#bed7dd]',
    lavender: 'bg-[#efe5f9] text-[#000000] border-[#ded0ed]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border font-mono tracking-tight shadow-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
