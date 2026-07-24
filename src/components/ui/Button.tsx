import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98]',
        // Variants
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100',
        variant === 'secondary' && 'bg-primary-light text-primary hover:bg-primary/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:active:scale-100',
        variant === 'outline' && 'border border-primary text-primary bg-white hover:bg-primary-light disabled:border-slate-200 disabled:text-slate-400 disabled:active:scale-100',
        variant === 'text' && 'text-primary hover:underline disabled:text-slate-400 disabled:active:scale-100 p-0 hover:bg-transparent active:scale-100',
        
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        
        fullWidth && 'w-full',
        disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
