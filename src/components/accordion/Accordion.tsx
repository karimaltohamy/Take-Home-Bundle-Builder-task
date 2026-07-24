import React from 'react';
import { Camera, Shield, Radio, Layers } from 'lucide-react';
import { useBundleStore } from '../../store/useBundleStore';
import { AccordionStep } from './AccordionStep';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { ACCORDION_STEPS } from '../../constants';
import { useSelectedCount } from '../../hooks/useSelectedCount';
import type { CategoryType } from '../../types/product';

/** Maps each category to its corresponding Lucide icon */
const STEP_ICONS: Record<CategoryType, React.ReactNode> = {
  cameras: <Camera size={20} className="stroke-[2]" />,
  plan: <Shield size={20} className="stroke-[2]" />,
  sensors: <Radio size={20} className="stroke-[2]" />,
  accessories: <Layers size={20} className="stroke-[2]" />,
};

/** Renders a single accordion step's product grid */
const StepContent: React.FC<{ category: CategoryType; nextLabel: string | null }> = ({
  category,
  nextLabel,
}) => {
  const products = useBundleStore((state) => state.products);
  const nextStep = useBundleStore((state) => state.nextStep);
  const filtered = products.filter((p) => p.category === category);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {nextLabel ? (
          <Button
            variant="outline"
            onClick={nextStep}
            className="border-primary text-primary hover:bg-primary-light font-semibold"
          >
            {nextLabel}
          </Button>
        ) : (
          <Typography variant="body-sm" className="text-slate-400 font-semibold italic text-center">
            Review and adjust your system items in the Live Review panel.
          </Typography>
        )}
      </div>
    </>
  );
};

/** Wrapper that reads the selected count for a step */
const StepWrapper: React.FC<{
  stepNumber: number;
  title: string;
  category: CategoryType;
  nextLabel: string | null;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ stepNumber, title, category, nextLabel, isOpen, onToggle }) => {
  const selectedCount = useSelectedCount(category);

  return (
    <AccordionStep
      stepNumber={stepNumber}
      title={title}
      isOpen={isOpen}
      selectedCount={selectedCount}
      onToggle={onToggle}
      icon={STEP_ICONS[category]}
    >
      <StepContent category={category} nextLabel={nextLabel} />
    </AccordionStep>
  );
};

export const Accordion: React.FC = () => {
  const currentStep = useBundleStore((state) => state.currentAccordionStep);
  const toggleAccordion = useBundleStore((state) => state.toggleAccordion);

  return (
    <div className="w-full flex flex-col">
      {ACCORDION_STEPS.map((step) => (
        <StepWrapper
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          title={step.title}
          category={step.category}
          nextLabel={step.nextLabel}
          isOpen={currentStep === step.stepNumber}
          onToggle={() => toggleAccordion(step.stepNumber)}
        />
      ))}
    </div>
  );
};
