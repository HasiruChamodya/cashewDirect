import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  Check,
  CheckCircle2,
  ChevronLeft,
  Package,
  Plus,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { addresses as savedAddresses } from '../data/account';
import { formatPrice } from '../lib/format';
import Button from '../components/ui/Button';
import Input, { Label } from '../components/ui/Input';
import ProductImage from '../components/ui/ProductImage';

const STEPS = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 350;

const EMPTY_ADDRESS = { name: '', phone: '', line1: '', line2: '', city: '', postalCode: '' };

function StepIndicator({ stepIndex }) {
  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                i < stepIndex
                  ? 'bg-brand-500 text-white'
                  : i === stepIndex
                  ? 'border-2 border-brand-500 text-brand-700'
                  : 'border-2 border-gray-200 text-gray-400'
              }`}
            >
              {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`mt-1.5 text-xs font-semibold ${
                i <= stepIndex ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`mx-2 mb-5 h-0.5 w-12 sm:w-24 ${i < stepIndex ? 'bg-brand-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const defaultAddress = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || 'new');
  const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (lines.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  function goNext(e) {
    e.preventDefault();
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    const id = `CD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setOrderPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const selectedAddress =
    selectedAddressId === 'new' ? newAddress : savedAddresses.find((a) => a.id === selectedAddressId);

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 className="h-10 w-10 text-brand-500" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order placed successfully!</h1>
        <p className="mt-2 text-gray-500">
          Thank you for your purchase. A confirmation email has been sent with your order details.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-card">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500">Order number</span>
            <span className="font-mono text-sm font-bold text-gray-900">{orderId}</span>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-gray-500">Estimated delivery</span>
            <span className="text-sm font-semibold text-gray-900">3 - 5 business days</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button to="/account?tab=orders" variant="outline">
            View Order
          </Button>
          <Button to="/shop">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Checkout</h1>

      <div className="mt-6 flex justify-center sm:justify-start">
        <StepIndicator stepIndex={stepIndex} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
          {/* Step 1: Shipping */}
          {stepIndex === 0 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>

              <div className="flex flex-col gap-3">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      selectedAddressId === addr.id
                        ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                        : 'border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1 h-4 w-4 accent-brand-500"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">
                        {addr.label} <span className="font-normal text-gray-500">· {addr.name}</span>
                      </p>
                      <p className="mt-0.5 text-gray-500">
                        {addr.line1}, {addr.line2}, {addr.city} {addr.postalCode}
                      </p>
                      <p className="mt-0.5 text-gray-500">{addr.phone}</p>
                    </div>
                  </label>
                ))}

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    selectedAddressId === 'new'
                      ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    className="h-4 w-4 accent-brand-500"
                    checked={selectedAddressId === 'new'}
                    onChange={() => setSelectedAddressId('new')}
                  />
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                    <Plus className="h-4 w-4" /> Use a new address
                  </span>
                </label>
              </div>

              {selectedAddressId === 'new' && (
                <div className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="full-name" required>
                      Full name
                    </Label>
                    <Input
                      id="full-name"
                      required
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" required>
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      placeholder="+94 7X XXX XXXX"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="line1" required>
                      Address line 1
                    </Label>
                    <Input
                      id="line1"
                      required
                      value={newAddress.line1}
                      onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                      placeholder="Street address, P.O. box"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="line2">Address line 2</Label>
                    <Input
                      id="line2"
                      value={newAddress.line2}
                      onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                      placeholder="Apartment, suite, unit (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" required>
                      City
                    </Label>
                    <Input
                      id="city"
                      required
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postal-code" required>
                      Postal code
                    </Label>
                    <Input
                      id="postal-code"
                      required
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      placeholder="00000"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end border-t border-gray-100 pt-5">
                <Button type="submit" size="lg">
                  Continue to Payment
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {stepIndex === 1 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === 'card'
                      ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4 accent-brand-500"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <CreditCard className="h-5 w-5 text-brand-600" />
                  <span className="text-sm font-semibold text-gray-900">Credit / Debit Card</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === 'cod'
                      ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4 accent-brand-500"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <Banknote className="h-5 w-5 text-brand-600" />
                  <span className="text-sm font-semibold text-gray-900">Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="card-name" required>
                      Name on card
                    </Label>
                    <Input
                      id="card-name"
                      required
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      placeholder="As it appears on your card"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="card-number" required>
                      Card number
                    </Label>
                    <Input
                      id="card-number"
                      required
                      inputMode="numeric"
                      maxLength={19}
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-expiry" required>
                      Expiry date
                    </Label>
                    <Input
                      id="card-expiry"
                      required
                      maxLength={5}
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv" required>
                      CVV
                    </Label>
                    <Input
                      id="card-cvv"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                      placeholder="123"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
                  Pay with cash when your order is delivered to your doorstep.
                </p>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <Button type="submit" size="lg">
                  Review Order
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Review */}
          {stepIndex === 2 && (
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
              <h2 className="text-lg font-bold text-gray-900">Review Your Order</h2>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Shipping to</p>
                  <button
                    type="button"
                    onClick={() => setStepIndex(0)}
                    className="text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-1.5 text-sm text-gray-600">
                  {selectedAddress?.name} · {selectedAddress?.phone}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedAddress?.line1}
                  {selectedAddress?.line2 ? `, ${selectedAddress.line2}` : ''}, {selectedAddress?.city}{' '}
                  {selectedAddress?.postalCode}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Payment method</p>
                  <button
                    type="button"
                    onClick={() => setStepIndex(1)}
                    className="text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-gray-600">
                  {paymentMethod === 'card' ? (
                    <>
                      <CreditCard className="h-4 w-4 text-brand-600" />
                      Card ending in {card.number ? card.number.slice(-4).padStart(4, '*') : '****'}
                    </>
                  ) : (
                    <>
                      <Banknote className="h-4 w-4 text-brand-600" />
                      Cash on Delivery
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-900">
                  Items ({lines.length})
                </p>
                <div className="flex flex-col divide-y divide-gray-100">
                  {lines.map((line) => (
                    <div key={line.productId} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <ProductImage category={line.product.category} className="h-12 w-12 rounded-lg" iconClassName="h-6 w-6" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{line.product.name}</p>
                        <p className="text-xs text-gray-500">Qty {line.qty}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{formatPrice(line.lineTotal)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-sm text-gray-600">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-brand-500" />
                I agree to the{' '}
                <Link to="/" className="font-semibold text-brand-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/" className="font-semibold text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>

              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <Button type="submit" size="lg">
                  Place Order
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

          <div className="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
            {lines.map((line) => (
              <div key={line.productId} className="flex items-center gap-3">
                <div className="relative">
                  <ProductImage category={line.product.category} className="h-12 w-12 rounded-lg" iconClassName="h-6 w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-[10px] font-bold text-white">
                    {line.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{line.product.name}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-gray-900">{formatPrice(line.lineTotal)}</p>
              </div>
            ))}
          </div>

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

          <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-500" />
              Secure checkout with 256-bit SSL encryption
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 shrink-0 text-brand-500" />
              Your payment information is never stored
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0 text-brand-500" />
              Free returns within 7 days
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0 text-brand-500" />
              Carefully packed for freshness
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
