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
        'border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-sm mb-4',
        isOpen && 'ring-2 ring-primary/10 border-primary/40'
      )}
    >
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full text-left px-5 py-4 flex items-center justify-between transition-all select-none cursor-pointer',
          isOpen ? 'bg-primary-light' : 'hover:bg-slate-50'
        )}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Step {stepNumber} of 4
          </span>
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-slate-500">{icon}</span>}
            <Typography variant="h3" className="font-bold text-slate-800">
              {title}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Selected items indicator */}
          {selectedCount > 0 && (
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
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
      </button>

      {/* Expanded Content Wrapper */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[2500px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="p-5 bg-slate-50/50">{children}</div>
      </div>
    </div>
  );
};
