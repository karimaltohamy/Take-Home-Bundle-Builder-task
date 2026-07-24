import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'discount';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
        // Variants
        variant === 'primary' && 'bg-primary text-white',
        variant === 'discount' && 'bg-primary text-white animate-soft-pulse shadow-sm',
        variant === 'secondary' && 'bg-slate-100 text-slate-700',
        variant === 'success' && 'bg-emerald-100 text-emerald-700',
        variant === 'outline' && 'border border-slate-200 text-slate-600 bg-white',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
