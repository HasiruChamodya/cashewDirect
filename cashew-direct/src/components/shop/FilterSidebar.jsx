import { categories } from '../../data/categories';
import { formatPrice } from '../../lib/format';
import Rating from '../ui/Rating';

const TAG_OPTIONS = [
  { value: 'sale', label: 'On Sale' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'bestseller', label: 'Bestsellers' },
  { value: 'trending', label: 'Trending' },
];

export default function FilterSidebar({ filters, onChange, priceMax, resultCount }) {
  function toggleCategory(slug) {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ ...filters, categories: next });
  }

  function toggleTag(value) {
    const next = filters.tags.includes(value)
      ? filters.tags.filter((t) => t !== value)
      : [...filters.tags, value];
    onChange({ ...filters, tags: next });
  }

  function clearAll() {
    onChange({ categories: [], maxPrice: priceMax, minRating: 0, inStockOnly: false, tags: [] });
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.maxPrice < priceMax ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.tags.length > 0;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs font-semibold text-brand-600 transition hover:text-brand-800">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Category</h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/30"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Max Price</h3>
        <input
          type="range"
          min={0}
          max={priceMax}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>Rs. 0</span>
          <span className="font-semibold text-gray-900">Up to {formatPrice(filters.maxPrice)}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Customer Rating</h3>
        <div className="flex flex-col gap-2.5">
          {[4.5, 4, 3].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === r}
                onChange={() => onChange({ ...filters, minRating: r })}
                className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500/30"
              />
              <Rating value={r} />
              <span>&amp; up</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900">
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === 0}
              onChange={() => onChange({ ...filters, minRating: 0 })}
              className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500/30"
            />
            Any rating
          </label>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/30"
          />
          In stock only
        </label>
      </div>

      {/* Tags */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Highlights</h3>
        <div className="flex flex-col gap-2.5">
          {TAG_OPTIONS.map((tag) => (
            <label key={tag.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 transition hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag.value)}
                onChange={() => toggleTag(tag.value)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/30"
              />
              {tag.label}
            </label>
          ))}
        </div>
      </div>

      {resultCount != null && (
        <p className="border-t border-gray-100 pt-4 text-xs text-gray-400">
          {resultCount} {resultCount === 1 ? 'product' : 'products'} found
        </p>
      )}
    </div>
  );
}
