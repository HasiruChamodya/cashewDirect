import { Users, Star, Sprout, PackageCheck } from 'lucide-react';

const STATS = [
  { icon: Users, value: '50,000+', label: 'Happy customers' },
  { icon: Star, value: '4.8 / 5', label: 'Average rating' },
  { icon: Sprout, value: '200+', label: 'Partner farms' },
  { icon: PackageCheck, value: '120,000+', label: 'Orders delivered' },
];

export default function TrustStats() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-none bg-gray-100 sm:grid-cols-4 sm:px-6 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 bg-white px-4 py-8 text-center">
            <stat.icon className="h-6 w-6 text-brand-500" strokeWidth={1.75} />
            <p className="text-2xl font-extrabold tracking-tight text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
