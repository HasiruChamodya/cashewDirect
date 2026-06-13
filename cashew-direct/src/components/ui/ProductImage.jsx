import {
  Sprout,
  Flame,
  Sparkles,
  Coffee,
  Salad,
  Gift,
  Nut,
  Package,
} from 'lucide-react';
import { getCategory } from '../../data/categories';

const ICONS = { Sprout, Flame, Sparkles, Coffee, Salad, Gift, Nut, Package };

const ROTATIONS = ['rotate-0', '-rotate-6', 'rotate-6', 'rotate-3'];

export default function ProductImage({
  category,
  variant = 0,
  className = '',
  iconClassName = 'h-16 w-16',
}) {
  const cat = getCategory(category);
  const Icon = ICONS[cat?.icon] || Package;
  const tint = cat?.tint || 'from-brand-100 to-brand-50';
  const rotation = ROTATIONS[variant % ROTATIONS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${tint} ${className}`}
    >
      <Icon
        className={`${iconClassName} ${rotation} text-brand-800/20`}
        strokeWidth={1.25}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.03]" />
    </div>
  );
}
