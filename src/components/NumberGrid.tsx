import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NumberGridProps {
  onNumberSelect: (number: number) => void;
  selectedNumber: number | null;
}

export function NumberGrid({ onNumberSelect, selectedNumber }: NumberGridProps) {
  return (
    <div className="grid grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
        <Button
          key={number}
          onClick={() => onNumberSelect(number)}
          className={cn(
            'h-16 w-16 md:h-20 md:w-20 text-2xl md:text-3xl font-bold rounded-xl transition-all shadow-lg',
            selectedNumber === number
              ? 'bg-primary text-white scale-110 shadow-primary/50'
              : 'bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200'
          )}
        >
          {number}
        </Button>
      ))}
    </div>
  );
}