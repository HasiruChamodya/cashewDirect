import { Quote } from 'lucide-react';
import Rating from '../ui/Rating';
import { testimonials } from '../../data/reviews';

function initialsOf(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
}

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Loved by thousands of customers
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-500">
            Real feedback from real buyers across Sri Lanka.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-card-hover"
            >
              <Quote className="h-6 w-6 text-brand-300" strokeWidth={1.5} />
              <Rating value={t.rating} className="mt-4" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                "{t.body}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                  {initialsOf(t.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
