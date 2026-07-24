import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  selected = false,
  hoverable = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border p-4 transition-all duration-300',
        selected ? 'border-primary ring-2 ring-primary shadow-md' : 'border-slate-200 shadow-sm',
        hoverable && 'hover:shadow-md hover:border-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
