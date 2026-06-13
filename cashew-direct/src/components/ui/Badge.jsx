const VARIANTS = {
  bestseller: 'bg-brand-800 text-white',
  new: 'bg-brand-500 text-white',
  sale: 'bg-red-500 text-white',
  trending: 'bg-amber-500 text-white',
  'low-stock': 'bg-amber-100 text-amber-800',
  'out-of-stock': 'bg-gray-200 text-gray-600',
  neutral: 'bg-gray-100 text-gray-700',
  brand: 'bg-brand-100 text-brand-800',
};

const LABELS = {
  bestseller: 'Bestseller',
  new: 'New',
  sale: 'Sale',
  trending: 'Trending',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
};

export default function Badge({ variant = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold leading-none tracking-wide ${VARIANTS[variant] || VARIANTS.neutral} ${className}`}
    >
      {children ?? LABELS[variant]}
    </span>
  );
}
