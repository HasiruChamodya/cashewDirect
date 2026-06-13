import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 'sm', className = '' }) {
  const starSize = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.round(value);
          return (
            <Star
              key={i}
              className={`${starSize} ${filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
            />
          );
        })}
      </div>
      <span className={`sr-only`}>{value} out of 5 stars</span>
      {value != null && (
        <span className={`${textSize} font-semibold text-gray-700`}>{value.toFixed(1)}</span>
      )}
      {count != null && (
        <span className={`${textSize} text-gray-400`}>({count.toLocaleString()})</span>
      )}
    </div>
  );
}
