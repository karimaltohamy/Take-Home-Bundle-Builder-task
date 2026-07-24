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
          'w-full text-left pb-3 pt-1.5 transition-all select-none cursor-pointer',
          isOpen ? 'bg-primary-light' : 'hover:bg-slate-50'
        )}
      >
        <span className="text-[10px] font-bold text-[#1F1F1F] uppercase tracking-widest border-b border-[#1F1F1F] block pb-1.5 mb-3 px-5" >
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
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z" fill="#4E2FD2" />
              </svg>

            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.40682 9.43039C6.20741 9.70956 5.7925 9.70956 5.59309 9.43038L1.56472 3.79062C1.32834 3.45968 1.5649 3 1.97159 3L10.0284 3C10.4351 3 10.6716 3.45969 10.4353 3.79062L6.40682 9.43039Z" fill="#4E2FD2" />
              </svg>

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
