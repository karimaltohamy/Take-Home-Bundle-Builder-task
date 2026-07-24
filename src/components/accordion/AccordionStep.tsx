import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Typography } from '../ui/Typography';

interface AccordionStepProps {
  stepNumber: number;
  title: string;
  isOpen: boolean;
  selectedCount: number;
  onToggle: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AccordionStep: React.FC<AccordionStepProps> = ({
  stepNumber,
  title,
  isOpen,
  selectedCount,
  onToggle,
  icon,
  children,
}) => {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 bg-white',
        !isOpen && 'border-b border-[#1F1F1F]',
        isOpen && "rounded-md"
      )}
    >
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full text-left py-4 transition-all select-none cursor-pointer',
          isOpen ? 'bg-primary-light' : 'hover:bg-slate-50'
        )}
      >
        <span className="text-[10px] font-bold text-[#1F1F1F] uppercase tracking-widest border-b border-[#1F1F1F] block pb-2 mb-4 px-5" >
          Step {stepNumber} of 4
        </span>

        <div className='flex items-center justify-between px-5'>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2.5">
              {icon && <span className="text-slate-500">{icon}</span>}
              <Typography variant="h2" className="font-semibold text-[#1F1F1F]">
                {title}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Selected items indicator */}
            {selectedCount > 0 && (
              <span className="text-xs font-semibold text-primary">
                {selectedCount} {selectedCount === 1 ? 'selected' : 'selected'}
              </span>
            )}

            {/* Collapse icon */}
            {isOpen ? (
              <ChevronUp size={18} className="text-primary font-bold" />
            ) : (
              <ChevronDown size={18} className="text-slate-400" />
            )}
          </div>
        </div>

      </button>

      {/* Expanded Content Wrapper */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out bg-primary-light',
          isOpen ? 'max-h-[2500px] ' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="p-5 ">{children}</div>
      </div>
    </div>
  );
};
