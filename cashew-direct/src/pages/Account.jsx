import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Package,
  Heart,
  MapPin,
  Settings,
  Plus,
  Trash2,
  Star,
  LogOut,
} from 'lucide-react';
import { currentUser, orders, addresses as initialAddresses, ORDER_STATUS_STYLES } from '../data/account';
import { getProductById } from '../data/products';
import { formatPrice, formatDate } from '../lib/format';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import Input, { Label } from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import ProductImage from '../components/ui/ProductImage';
import ProductCard from '../components/product/ProductCard';

const TABS = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: Settings },
];

const EMPTY_ADDRESS = { label: '', name: '', phone: '', line1: '', line2: '', city: '', postalCode: '' };

function OrdersTab() {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order, it will appear here."
        action={<Button to="/shop">Start Shopping</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Order {order.id}</p>
              <p className="text-xs text-gray-500">Placed on {formatDate(order.date)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ORDER_STATUS_STYLES[order.status]}`}>
              {order.status}
            </span>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {order.items.map((item) => {
              const product = getProductById(item.productId);
              return (
                <div key={item.productId} className="flex items-center gap-3 py-3">
                  <ProductImage category={product?.category} className="h-12 w-12 rounded-lg" iconClassName="h-6 w-6" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.qty)}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-base font-bold text-gray-900">{formatPrice(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WishlistTab() {
  const { products } = useWishlist();

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Save items you love so you can find them easily later."
        action={<Button to="/shop">Browse Products</Button>}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} variant={i} />
      ))}
    </div>
  );
}

function AddressesTab() {
  const [addressList, setAddressList] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_ADDRESS);
  const { showToast } = useToast();

  function handleAdd(e) {
    e.preventDefault();
    setAddressList((prev) => [
      ...prev,
      { ...form, id: `addr${Date.now()}`, label: form.label || 'Address', isDefault: prev.length === 0 },
    ]);
    setForm(EMPTY_ADDRESS);
    setModalOpen(false);
    showToast('Address saved');
  }

  function handleRemove(id) {
    setAddressList((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSetDefault(id) {
    setAddressList((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">{addressList.length} saved address{addressList.length !== 1 ? 'es' : ''}</p>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add New Address
        </Button>
      </div>

      {addressList.length === 0 ? (
        <EmptyState icon={MapPin} title="No saved addresses" description="Add an address to speed up checkout." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addressList.map((addr) => (
            <div key={addr.id} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-gray-900">{addr.label}</p>
                {addr.isDefault && (
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">Default</span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{addr.name}</p>
              <p className="text-sm text-gray-600">
                {addr.line1}
                {addr.line2 ? `, ${addr.line2}` : ''}, {addr.city} {addr.postalCode}
              </p>
              <p className="text-sm text-gray-600">{addr.phone}</p>

              <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-700"
                  >
                    <Star className="h-3.5 w-3.5" /> Set as default
                  </button>
                )}
                <button
                  onClick={() => handleRemove(addr.id)}
                  className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Address">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="addr-label" required>
                Label
              </Label>
              <Input
                id="addr-label"
                required
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="e.g. Home, Office"
              />
            </div>
            <div>
              <Label htmlFor="addr-name" required>
                Full name
              </Label>
              <Input
                id="addr-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Recipient's name"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="addr-phone" required>
                Phone number
              </Label>
              <Input
                id="addr-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+94 7X XXX XXXX"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="addr-line1" required>
                Address line 1
              </Label>
              <Input
                id="addr-line1"
                required
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                placeholder="Street address"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="addr-line2">Address line 2</Label>
              <Input
                id="addr-line2"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="Apartment, suite (optional)"
              />
            </div>
            <div>
              <Label htmlFor="addr-city" required>
                City
              </Label>
              <Input
                id="addr-city"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="addr-postal" required>
                Postal code
              </Label>
              <Input
                id="addr-postal"
                required
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                placeholder="00000"
              />
            </div>
          </div>
          <Button type="submit" fullWidth>
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
}

function ProfileTab() {
  const [form, setForm] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
  });
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    showToast('Profile updated successfully');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
      <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="first-name" required>
            First name
          </Label>
          <Input
            id="first-name"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="last-name" required>
            Last name
          </Label>
          <Input
            id="last-name"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email" required>
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="profile-phone" required>
            Phone number
          </Label>
          <Input
            id="profile-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}

export default function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const tab = searchParams.get('tab') || 'orders';

  function setTab(id) {
    const next = new URLSearchParams(searchParams);
    next.set('tab', id);
    setSearchParams(next);
  }

  function handleSignOut() {
    showToast('You have been signed out');
    navigate('/');
  }

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">My Account</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base font-bold text-brand-800">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="truncate text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    tab === t.id ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
              <button
                onClick={handleSignOut}
                className="mt-2 flex items-center gap-3 rounded-lg border-t border-gray-100 px-3 pt-4 text-sm font-semibold text-gray-500 transition hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div>
          <div className="mb-6 lg:hidden">
            <Tabs
              tabs={TABS.map((t) => ({ id: t.id, label: t.label }))}
              active={tab}
              onChange={setTab}
            />
          </div>

          {tab === 'orders' && <OrdersTab />}
          {tab === 'wishlist' && <WishlistTab />}
          {tab === 'addresses' && <AddressesTab />}
          {tab === 'profile' && <ProfileTab />}
        </div>
      </div>
    </div>
  );
}
