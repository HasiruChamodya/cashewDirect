// Pool of review content, deterministically distributed across products
// so every product detail page has a believable review list.
const REVIEW_POOL = [
  {
    name: 'Amaya Perera',
    rating: 5,
    title: 'Best cashews I have bought online',
    body: "Ordered on a Tuesday, arrived Thursday. The packaging was sealed properly and the nuts taste incredibly fresh — none of that stale supermarket taste. Already reordered.",
    daysAgo: 6,
  },
  {
    name: 'Dinesh Wickramasinghe',
    rating: 5,
    title: 'Noticeably fresher than store-bought',
    body: 'You can really taste the difference when nuts are this fresh. Crunchy, buttery, not a single shrivelled piece in the bag. Worth the slightly higher price.',
    daysAgo: 14,
  },
  {
    name: 'Nethmi Fernando',
    rating: 4,
    title: 'Great taste, packaging could be sturdier',
    body: 'The cashews themselves are excellent — five stars on taste. Knocking one star off because the outer box arrived a bit dented, though the product inside was fine.',
    daysAgo: 21,
  },
  {
    name: 'Ruwan Jayasuriya',
    rating: 5,
    title: 'My go-to gift for clients now',
    body: "Bought a few of these for clients during the holidays and got so many compliments. Looks premium without being over the top. Will be buying again next year.",
    daysAgo: 33,
  },
  {
    name: 'Tharushi Gunasekara',
    rating: 5,
    title: 'Kids love these, and so do I',
    body: "Finally a snack I don't feel guilty giving the kids. No weird aftertaste, just real roasted flavour. The resealable bag actually stays fresh too.",
    daysAgo: 9,
  },
  {
    name: 'Kasun Bandara',
    rating: 4,
    title: 'Solid quality, fast delivery',
    body: "Delivery was quicker than expected — two days. Quality is consistent with what's pictured. Would like to see a bigger size option in future.",
    daysAgo: 45,
  },
  {
    name: 'Ishara Madushani',
    rating: 5,
    title: 'Could not stop eating these',
    body: 'I bought this as a "treat for the week" and it lasted exactly two days. Worth every rupee. The flavour is balanced, not overpowering at all.',
    daysAgo: 17,
  },
  {
    name: 'Sahan Rajapaksa',
    rating: 3,
    title: 'Good but a little pricey',
    body: 'Quality is genuinely good and freshness is noticeable, but the price per kilo is on the higher side compared to local markets. Still, convenient and reliable.',
    daysAgo: 60,
  },
  {
    name: 'Hashini De Silva',
    rating: 5,
    title: 'Exactly as described',
    body: "Photos on the listing match the real product, which is rare these days. Grading was accurate, size was consistent. Very happy with this purchase.",
    daysAgo: 4,
  },
  {
    name: 'Chamod Perera',
    rating: 5,
    title: 'Subscribing for monthly delivery',
    body: "This is now part of my monthly grocery order. Consistent quality every time, and the customer support team replied to my question within an hour.",
    daysAgo: 28,
  },
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getReviewsForProduct(productId, count = 4) {
  const start = hashString(productId) % REVIEW_POOL.length;
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const review = REVIEW_POOL[(start + i) % REVIEW_POOL.length];
    reviews.push({ id: `${productId}-r${i}`, verified: i % 3 !== 2, ...review });
  }
  return reviews;
}

// Curated storefront-wide testimonials for the homepage
export const testimonials = [
  {
    name: 'Amaya Perera',
    role: 'Verified Buyer · Colombo',
    rating: 5,
    body: "I've ordered from Kaju.live five times now and every single batch has been fresh and well packed. It's become my default gift for visiting family abroad.",
  },
  {
    name: 'Ruwan Jayasuriya',
    role: 'Verified Buyer · Kandy',
    rating: 5,
    body: "The honey roasted cashews are dangerously good. Delivery has always been on time, and the packaging feels premium enough to gift straight out of the box.",
  },
  {
    name: 'Tharushi Gunasekara',
    role: 'Verified Buyer · Galle',
    rating: 5,
    body: "Customer support helped me change my delivery address after I'd already placed the order — quick, friendly, and no hassle. The cashews are excellent too.",
  },
  {
    name: 'Kasun Bandara',
    role: 'Verified Buyer · Negombo',
    rating: 4,
    body: "Great range of flavours and the trail mixes are perfect for my hiking trips. Would love to see more bulk pack sizes in future.",
  },
];
