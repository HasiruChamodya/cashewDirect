import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, PackageSearch } from 'lucide-react';
import { products } from '../data/products';
import { getCategory as getCategoryInfo } from '../data/categories';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Select } from '../components/ui/Input';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/product/ProductCard';

const PAGE_SIZE = 12;
const PRICE_MAX = Math.max(...products.map((p) => p.price));

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'bestselling', label: 'Bestselling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Rating' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');
  const queryQ = searchParams.get('q') || '';
  const querySort = searchParams.get('sort') || 'featured';

  const [filters, setFilters] = useState({
    categories: queryCategory ? [queryCategory] : [],
    maxPrice: PRICE_MAX,
    minRating: 0,
    inStockOnly: false,
    tags: [],
  });
  const [sort, setSort] = useState(querySort);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // React to category changes coming from nav links / search
  useEffect(() => {
    if (queryCategory) {
      setFilters((f) => ({ ...f, categories: [queryCategory] }));
    }
  }, [queryCategory]);

  useEffect(() => {
    setSort(querySort);
  }, [querySort]);

  const filtered = useMemo(() => {
    let list = products;

    if (queryQ) {
      const q = queryQ.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.includes(q)
      );
    }
    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      list = list.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }
    if (filters.tags.length) {
      list = list.filter((p) => filters.tags.some((t) => p.badges.includes(t)));
    }
    return list;
  }, [filters, queryQ]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new')));
      case 'bestselling':
        return list.sort((a, b) => Number(b.badges.includes('bestseller')) - Number(a.badges.includes('bestseller')));
      default:
        return list;
    }
  }, [filtered, sort]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort, queryQ]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSortChange(value) {
    setSort(value);
    const next = new URLSearchParams(searchParams);
    next.set('sort', value);
    setSearchParams(next, { replace: true });
  }

  const activeCategory =
    filters.categories.length === 1 ? getCategoryInfo(filters.categories[0]) : null;

  const heading = queryQ
    ? `Search results for "${queryQ}"`
    : activeCategory
    ? activeCategory.name
    : 'All Products';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Shop', to: '/shop' }, ...(activeCategory && !queryQ ? [{ label: activeCategory.name }] : [])]} />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{heading}</h1>
          {activeCategory && !queryQ && <p className="mt-1 text-gray-500">{activeCategory.description}</p>}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onChange={setFilters} priceMax={PRICE_MAX} resultCount={sorted.length} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:bg-brand-50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <p className="hidden text-sm text-gray-500 sm:block">
              Showing <span className="font-semibold text-gray-900">{pageItems.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{sorted.length}</span> products
            </p>
            <div className="ml-auto flex items-center gap-2 sm:ml-0">
              <span className="hidden text-sm text-gray-500 sm:inline">Sort by</span>
              <Select value={sort} onChange={(e) => handleSortChange(e.target.value)} className="w-44 sm:w-52">
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              description="Try adjusting your filters or search term to find what you're looking for."
              action={
                <Button variant="outline" onClick={() => setFilters({ categories: [], maxPrice: PRICE_MAX, minRating: 0, inStockOnly: false, tags: [] })}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
                {pageItems.map((product, i) => (
                  <ProductCard key={product.id} product={product} variant={i} />
                ))}
              </div>
              <div className="mt-10">
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        onClick={() => setMobileFiltersOpen(false)}
        className={`fixed inset-0 z-50 bg-gray-900/30 transition-opacity duration-300 lg:hidden ${
          mobileFiltersOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="text-lg font-bold text-gray-900">Filters</span>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 px-5 py-5">
          <FilterSidebar filters={filters} onChange={setFilters} priceMax={PRICE_MAX} resultCount={sorted.length} />
        </div>
        <div className="border-t border-gray-200 px-5 py-4">
          <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>
            Show {sorted.length} results
          </Button>
        </div>
      </aside>
    </div>
  );
}
