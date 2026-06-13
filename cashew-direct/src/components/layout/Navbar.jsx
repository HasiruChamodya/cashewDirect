import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
  Leaf,
  Truck,
} from 'lucide-react';
import { categories } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar({ onCartClick, onMenuClick }) {
  const [catOpen, setCatOpen] = useState(false);
  const [search, setSearch] = useState('');
  const catRef = useRef(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    function onClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(search.trim() ? `/shop?q=${encodeURIComponent(search.trim())}` : '/shop');
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Announcement bar */}
      <div className="bg-brand-800 px-4 py-2 text-center text-xs font-medium text-brand-50 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" />
          Free island-wide delivery on orders over Rs. 5,000 — Use code{' '}
          <span className="font-bold">FRESH10</span> for 10% off your first order
        </span>
      </div>

      <div className="border-b border-gray-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="-ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Leaf className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-lg font-bold tracking-tight text-brand-800">
              CashewDirect
            </span>
          </Link>

          {/* Category dropdown — desktop */}
          <div className="relative hidden shrink-0 lg:block" ref={catRef}>
            <button
              onClick={() => setCatOpen((o) => !o)}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              Categories
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => setCatOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-800"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search for cashews, gift boxes, trail mixes…"
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            />
          </form>

          {/* Right nav links */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <Link to="/shop" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              Shop
            </Link>
            <Link to="/shop?category=gift-boxes" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              Gift Boxes
            </Link>
            <Link to="/account" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              About Us
            </Link>
          </nav>

          {/* Icon actions */}
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <Link
              to="/account?tab=wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 sm:flex"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={onCartClick}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="relative px-4 pb-3 md:hidden">
          <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search products…"
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
          />
        </form>
      </div>
    </header>
  );
}
