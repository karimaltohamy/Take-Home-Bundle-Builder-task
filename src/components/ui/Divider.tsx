import React from 'react';
import { cn } from '../../lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-slate-200',
        orientation === 'horizontal' ? 'h-[1px] w-full my-4' : 'w-[1px] h-full mx-4',
        className
      )}
      {...props}
    />
  );
};
