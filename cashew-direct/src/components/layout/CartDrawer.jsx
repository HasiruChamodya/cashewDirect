import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';
import QuantityStepper from '../ui/QuantityStepper';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';

export default function CartDrawer({ isOpen, onClose }) {
  const { lines, subtotal, updateQty, removeItem } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-gray-900/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            Your Cart {lines.length > 0 && <span className="text-gray-400">({lines.length})</span>}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Add some premium cashews to get started."
              action={
                <Button to="/shop" onClick={onClose} size="sm">
                  Browse Products
                </Button>
              }
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex gap-3">
                  <Link to={`/product/${product.slug}`} onClick={onClose} className="shrink-0">
                    <ProductImage
                      category={product.category}
                      className="h-20 w-20 rounded-lg"
                      iconClassName="h-8 w-8"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="text-sm font-semibold text-gray-900 transition hover:text-brand-700 line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="shrink-0 text-gray-300 transition hover:text-red-500"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{product.weight}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        value={qty}
                        onChange={(v) => updateQty(product.id, v)}
                        size="sm"
                        max={product.stock}
                      />
                      <span className="text-sm font-bold text-gray-900">{formatPrice(lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4">
            <div className="mb-4 flex items-center justify-between text-base font-bold text-gray-900">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="flex flex-col gap-2">
              <Button to="/checkout" onClick={onClose} fullWidth size="lg">
                Checkout
              </Button>
              <Button to="/cart" onClick={onClose} variant="outline" fullWidth>
                View Cart
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
