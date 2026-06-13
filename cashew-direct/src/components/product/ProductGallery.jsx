import { useState } from 'react';
import ProductImage from '../ui/ProductImage';

export default function ProductGallery({ category, name }) {
  const [active, setActive] = useState(0);
  const variants = [0, 1, 2, 3];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:w-20 sm:flex-col sm:overflow-visible">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setActive(v)}
            className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
              active === v ? 'border-brand-500' : 'border-transparent hover:border-gray-200'
            }`}
            aria-label={`View image ${v + 1}`}
          >
            <ProductImage category={category} variant={v} className="h-16 w-16 sm:h-18 sm:w-18" iconClassName="h-8 w-8" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="order-1 flex-1 sm:order-2">
        <ProductImage
          category={category}
          variant={active}
          className="aspect-square w-full rounded-2xl"
          iconClassName="h-32 w-32 sm:h-40 sm:w-40"
        />
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
}
