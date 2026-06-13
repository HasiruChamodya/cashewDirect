import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import ProductImage from '../ui/ProductImage';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { formatPrice } from '../../lib/format';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { STOCK_THRESHOLD_LOW } from '../../data/products';

export default function ProductCard({ product, variant = 0 }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = has(product.id);
  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= STOCK_THRESHOLD_LOW;
  const primaryBadge = product.badges?.[0];

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product.id, 1);
    showToast(`${product.name} added to cart`);
  }

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
    >
      <div className="relative">
        <ProductImage
          category={product.category}
          variant={variant}
          className="aspect-square w-full"
          iconClassName="h-20 w-20 transition-transform duration-300 group-hover:scale-110"
        />

        {primaryBadge && (
          <div className="absolute left-3 top-3">
            <Badge variant={primaryBadge}>{primaryBadge === 'sale' && product.compareAtPrice ? `-${Math.round((1 - product.price / product.compareAtPrice) * 100)}%` : undefined}</Badge>
          </div>
        )}

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur transition hover:text-red-500"
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-sm font-semibold text-brand-800 shadow-md ring-1 ring-gray-200 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {outOfStock ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {product.weight}
        </p>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900 transition group-hover:text-brand-700">
          {product.name}
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {lowStock && (
          <p className="text-xs font-medium text-amber-600">Only {product.stock} left in stock</p>
        )}
      </div>
    </Link>
  );
}
