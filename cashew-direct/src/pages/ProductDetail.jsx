import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Check,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  PackageSearch,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, STOCK_THRESHOLD_LOW } from '../data/products';
import { getCategory } from '../data/categories';
import { getReviewsForProduct } from '../data/reviews';
import { formatPrice } from '../lib/format';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

import Breadcrumbs from '../components/ui/Breadcrumbs';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import QuantityStepper from '../components/ui/QuantityStepper';
import Tabs from '../components/ui/Tabs';
import EmptyState from '../components/ui/EmptyState';
import ProductGallery from '../components/product/ProductGallery';
import ReviewsSection from '../components/product/ReviewsSection';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const tabsRef = useRef(null);

  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={PackageSearch}
          title="Product not found"
          description="The product you're looking for doesn't exist or may have been removed."
          action={<Button to="/shop">Back to Shop</Button>}
        />
      </div>
    );
  }

  const category = getCategory(product.category);
  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  const wishlisted = has(product.id);
  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= STOCK_THRESHOLD_LOW;
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  function handleAddToCart() {
    addItem(product.id, qty);
    showToast(`${product.name} added to cart`);
  }

  function handleBuyNow() {
    addItem(product.id, qty);
    navigate('/checkout');
  }

  function goToReviews() {
    setActiveTab('reviews');
    requestAnimationFrame(() => {
      tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          { label: category.name, to: `/shop?category=${category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery category={product.category} name={product.name} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{category.name}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <button onClick={goToReviews} className="text-sm font-medium text-brand-600 transition hover:underline">
              See reviews
            </button>
          </div>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold tracking-tight text-gray-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                <Badge variant="sale">Save {discount}%</Badge>
              </>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.weight} · Inclusive of all taxes</p>

          <p className="mt-5 max-w-prose text-base leading-relaxed text-gray-600">{product.shortDescription}</p>

          {/* Stock status */}
          <div className="mt-5">
            {outOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                <XCircle className="h-4 w-4" /> Out of Stock
              </span>
            ) : lowStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <AlertCircle className="h-4 w-4" /> Only {product.stock} left in stock — order soon
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                <CheckCircle2 className="h-4 w-4" /> In Stock — ready to ship
              </span>
            )}
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(product.stock, 1)} />
            <Button
              onClick={handleAddToCart}
              disabled={outOfStock}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} disabled={outOfStock} size="lg" className="flex-1">
              Buy Now
            </Button>
          </div>

          <button
            onClick={() => toggle(product.id)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-500"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlisted ? 'Saved to wishlist' : 'Add to wishlist'}
          </button>

          {/* Highlights */}
          <ul className="mt-6 grid gap-2.5 border-t border-gray-100 pt-6 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {h}
              </li>
            ))}
          </ul>

          {/* Trust row */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
            {[
              { icon: Truck, label: 'Free Delivery' },
              { icon: RotateCcw, label: '7-Day Returns' },
              { icon: ShieldCheck, label: 'Secure Payment' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                <item.icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div ref={tabsRef} className="mt-16 scroll-mt-24">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <div className="py-8">
          {activeTab === 'description' && (
            <p className="max-w-3xl text-base leading-relaxed text-gray-600">{product.description}</p>
          )}
          {activeTab === 'specifications' && (
            <dl className="max-w-2xl divide-y divide-gray-100 border-y border-gray-100">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-4 py-3 text-sm">
                  <dt className="font-medium text-gray-500">{key}</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === 'reviews' && <ReviewsSection product={product} reviews={reviews} />}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} variant={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
