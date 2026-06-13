import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import ProductCard from '../product/ProductCard';

export default function ProductSection({ title, subtitle, products, viewAllHref, tinted = false }) {
  return (
    <section className={tinted ? 'bg-brand-50' : 'bg-white'}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Button to={viewAllHref} variant="ghost" size="sm" className="hidden sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} variant={i} />
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-8 flex justify-center sm:hidden">
            <Button to={viewAllHref} variant="outline">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
