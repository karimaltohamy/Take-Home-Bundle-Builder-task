import React from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  variant = 'body',
  as,
  ...props
}) => {
  const Component = as || (
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' : 'p'
  );

  return (
    <Component
      className={cn(
        // Font families and weights
        variant === 'h1' && 'text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none',
        variant === 'h2' && 'text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-snug',
        variant === 'h3' && 'text-base md:text-lg font-semibold text-slate-800 leading-normal',
        variant === 'body' && 'text-sm md:text-base font-normal text-slate-600 leading-relaxed',
        variant === 'body-sm' && 'text-xs md:text-sm font-normal text-slate-500 leading-relaxed',
        variant === 'caption' && 'text-[11px] md:text-xs font-medium text-slate-400 tracking-wide uppercase',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
