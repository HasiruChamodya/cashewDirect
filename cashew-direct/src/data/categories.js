export const categories = [
  {
    slug: 'raw-cashews',
    name: 'Raw Cashews',
    icon: 'Sprout',
    description: 'Premium unroasted nuts, straight from the farm',
    tint: 'from-brand-100 to-brand-50',
  },
  {
    slug: 'roasted-cashews',
    name: 'Roasted & Salted',
    icon: 'Flame',
    description: 'Slow-roasted to golden perfection',
    tint: 'from-amber-100 to-amber-50',
  },
  {
    slug: 'flavoured-cashews',
    name: 'Flavoured Cashews',
    icon: 'Sparkles',
    description: 'Bold spice blends & coatings',
    tint: 'from-orange-100 to-orange-50',
  },
  {
    slug: 'cashew-butter',
    name: 'Cashew Butter',
    icon: 'Coffee',
    description: 'Stone-ground, creamy spreads',
    tint: 'from-yellow-100 to-yellow-50',
  },
  {
    slug: 'trail-mixes',
    name: 'Trail Mixes',
    icon: 'Salad',
    description: 'Energy-packed nut & fruit blends',
    tint: 'from-lime-100 to-lime-50',
  },
  {
    slug: 'gift-boxes',
    name: 'Gift Boxes',
    icon: 'Gift',
    description: 'Curated hampers for every occasion',
    tint: 'from-emerald-100 to-emerald-50',
  },
  {
    slug: 'other-nuts',
    name: 'Other Nuts',
    icon: 'Nut',
    description: 'Almonds, pistachios & more',
    tint: 'from-stone-100 to-stone-50',
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
