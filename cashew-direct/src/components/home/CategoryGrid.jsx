import { Link } from 'react-router-dom';
import {
  Sprout,
  Flame,
  Sparkles,
  Coffee,
  Salad,
  Gift,
  Nut,
  ArrowUpRight,
} from 'lucide-react';
import { categories } from '../../data/categories';

const ICONS = { Sprout, Flame, Sparkles, Coffee, Salad, Gift, Nut };

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-gray-500">
            From raw nuts to gourmet gift boxes — find exactly what you're after.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = ICONS[cat.icon] || Nut;
          return (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br ${cat.tint} p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-gray-400 opacity-0 transition group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
