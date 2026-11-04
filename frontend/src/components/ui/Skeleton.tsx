import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Skeleton({ className = '', variant = 'dark', ...props }: SkeletonProps) {
  const shimmerClass = variant === 'light' ? 'skeleton-shimmer' : 'skeleton-shimmer-dark';
  return (
    <div
      className={`rounded-md ${shimmerClass} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
