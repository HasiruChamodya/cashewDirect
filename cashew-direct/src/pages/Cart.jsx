import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Tag, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import QuantityStepper from '../components/ui/QuantityStepper';
import EmptyState from '../components/ui/EmptyState';
import ProductImage from '../components/ui/ProductImage';

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 350;

export default function Cart() {
  const { lines, subtotal, removeItem, updateQty } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const shipping = lines.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  function handleApplyCoupon(e) {
    e.preventDefault();
    if (!coupon.trim()) return;
    setCouponMessage({ type: 'error', text: `Coupon "${coupon.trim()}" is not valid or has expired.` });
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="mt-6">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Explore our products and find something you'll love."
            action={<Button to="/shop">Start Shopping</Button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Shopping Cart</h1>
      <p className="mt-1 text-sm text-gray-500">{lines.length} item{lines.length > 1 ? 's' : ''} in your cart</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart items */}
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-card">
          {lines.map((line) => (
            <div key={line.productId} className="flex gap-4 p-4 sm:p-5">
              <Link to={`/product/${line.product.slug}`} className="shrink-0">
                <ProductImage
                  category={line.product.category}
                  className="h-24 w-24 rounded-xl sm:h-28 sm:w-28"
                  iconClassName="h-10 w-10 sm:h-12 sm:w-12"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/product/${line.product.slug}`}
                      className="line-clamp-2 text-sm font-semibold text-gray-900 transition hover:text-brand-700 sm:text-base"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-gray-500">{line.product.weight}</p>
                  </div>
                  <button
                    onClick={() => removeItem(line.productId)}
                    aria-label="Remove item"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                  <QuantityStepper
                    value={line.qty}
                    onChange={(qty) => updateQty(line.productId, qty)}
                    max={line.product.stock}
                    size="sm"
                  />
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 sm:text-base">{formatPrice(line.lineTotal)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 sm:p-5">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

          {remainingForFreeShipping > 0 ? (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs font-medium text-brand-700">
              <Truck className="h-4 w-4 shrink-0" />
              Add {formatPrice(remainingForFreeShipping)} more for free shipping
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs font-medium text-brand-700">
              <Truck className="h-4 w-4 shrink-0" />
              Your order qualifies for free shipping
            </div>
          )}

          {/* Coupon */}
          <form onSubmit={handleApplyCoupon} className="mt-5">
            <label htmlFor="coupon" className="mb-1.5 block text-sm font-medium text-gray-700">
              Coupon code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="coupon"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponMessage(null);
                  }}
                  placeholder="Enter code"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                />
              </div>
              <Button type="submit" variant="outline">
                Apply
              </Button>
            </div>
            {couponMessage && (
              <p className="mt-2 text-xs font-medium text-red-500">{couponMessage.text}</p>
            )}
          </form>

          {/* Price breakdown */}
          <div className="mt-5 flex flex-col gap-2.5 border-t border-gray-100 pt-5 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 text-base">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-extrabold text-gray-900">{formatPrice(total)}</span>
            </div>
          </div>

          <Button to="/checkout" fullWidth size="lg" className="mt-5">
            Proceed to Checkout
          </Button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
            Secure checkout · 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}
