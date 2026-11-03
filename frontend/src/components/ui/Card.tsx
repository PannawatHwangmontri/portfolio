import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border-subtle rounded-xl p-6 transition-colors duration-150 hover:border-accent/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
