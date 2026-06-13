import { Link, useNavigate } from 'react-router-dom';
import { X, User, Heart, Package, MapPin, Settings, LogOut, Store } from 'lucide-react';
import { categories } from '../../data/categories';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../ui/Button';

const ACCOUNT_LINKS = [
  { label: 'My Orders', to: '/account?tab=orders', icon: Package },
  { label: 'Wishlist', to: '/account?tab=wishlist', icon: Heart },
  { label: 'Saved Addresses', to: '/account?tab=addresses', icon: MapPin },
  { label: 'Profile Settings', to: '/account?tab=profile', icon: Settings },
];

export default function MobileMenu({ isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initials = isAuthenticated
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  function handleLogout() {
    logout();
    onClose();
    showToast('You have been signed out');
    navigate('/');
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-gray-900/30 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="text-lg font-bold text-brand-800">Menu</span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">{user.fullName}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 border-b border-gray-100 px-5 py-4">
            <Button to="/login" onClick={onClose} variant="outline" size="sm" className="flex-1">
              Sign In
            </Button>
            <Button to="/signup" onClick={onClose} size="sm" className="flex-1">
              Sign Up
            </Button>
          </div>
        )}

        <nav className="flex flex-col gap-1 px-3 py-4">
          <Link to="/shop" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-brand-50">
            Shop All
          </Link>
          <Link to="/account" onClick={onClose} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-brand-50">
            <User className="h-4 w-4" /> My Account
          </Link>
        </nav>

        <div className="border-t border-gray-100 px-5 pb-2 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Categories</p>
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              onClick={onClose}
              className="rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        {isAuthenticated && (
          <>
            <div className="border-t border-gray-100 px-5 pb-2 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">My Account</p>
            </div>
            <nav className="flex flex-col gap-1 px-3 pb-6">
              {ACCOUNT_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  <link.icon className="h-4 w-4 text-gray-400" />
                  {link.label}
                </Link>
              ))}
              {user.isSeller && (
                <Link
                  to="/account?tab=profile"
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  <Store className="h-4 w-4 text-gray-400" /> My Store
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center gap-2.5 border-t border-gray-100 px-3 pt-4 text-sm font-semibold text-gray-500 transition hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </>
        )}
      </aside>
    </>
  );
}
