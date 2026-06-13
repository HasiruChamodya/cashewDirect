import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductSection from '../components/home/ProductSection';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import {
  getProductsByIds,
  FEATURED_IDS,
  BESTSELLER_IDS,
  TRENDING_IDS,
} from '../data/products';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <CategoryGrid />
      <ProductSection
        title="Featured Products"
        subtitle="Our most-loved picks, curated for you"
        products={getProductsByIds(FEATURED_IDS)}
        viewAllHref="/shop"
      />
      <ProductSection
        title="Best Sellers"
        subtitle="What everyone keeps coming back for"
        products={getProductsByIds(BESTSELLER_IDS)}
        viewAllHref="/shop?sort=bestselling"
        tinted
      />
      <ProductSection
        title="Trending Now"
        subtitle="New flavours and customer favourites"
        products={getProductsByIds(TRENDING_IDS)}
        viewAllHref="/shop?sort=newest"
      />
      <Testimonials />
      <Newsletter />
    </>
  );
}
