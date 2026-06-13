import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Button from '../ui/Button';
import ProductImage from '../ui/ProductImage';

export default function Hero() {
  return (
    <section className="overflow-hidden border-b border-gray-200 bg-brand-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-20 lg:px-8">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Farm-fresh, lab-tested quality
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Premium cashews,
            <span className="block text-brand-600">delivered fresh</span>
            from farm to door.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Hand-picked, naturally grown and roasted in small batches in
            Sri Lanka. No middlemen, no fillers — just honest, delicious nuts.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/shop" size="lg">
              Shop Bestsellers
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/shop?category=gift-boxes" variant="outline" size="lg">
              Explore Gift Boxes
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {['AP', 'RJ', 'TG', 'KB'].map((initials) => (
                <div
                  key={initials}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-50 bg-brand-200 text-xs font-bold text-brand-800"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-sm font-bold text-gray-900">4.8/5</span>
              </div>
              <p className="text-sm text-gray-500">from 1,200+ verified buyers</p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="grid grid-cols-2 gap-4">
            <ProductImage
              category="raw-cashews"
              variant={0}
              className="col-span-2 aspect-[16/10] rounded-2xl"
              iconClassName="h-20 w-20"
            />
            <ProductImage
              category="roasted-cashews"
              variant={1}
              className="aspect-square rounded-2xl"
              iconClassName="h-14 w-14"
            />
            <ProductImage
              category="gift-boxes"
              variant={2}
              className="aspect-square rounded-2xl"
              iconClassName="h-14 w-14"
            />
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Quality Guaranteed</p>
                <p className="text-xs text-gray-500">7-day hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
