import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { FacebookIcon, InstagramIcon, XIcon } from '../ui/SocialIcons';

const LINK_COLUMNS = {
  Shop: [
    { label: 'All Products', to: '/shop' },
    { label: 'Raw Cashews', to: '/shop?category=raw-cashews' },
    { label: 'Roasted & Salted', to: '/shop?category=roasted-cashews' },
    { label: 'Gift Boxes', to: '/shop?category=gift-boxes' },
    { label: 'Trail Mixes', to: '/shop?category=trail-mixes' },
  ],
  'Customer Care': [
    { label: 'Track Your Order', to: '/account?tab=orders' },
    { label: 'Shipping & Returns', to: '/' },
    { label: 'FAQs', to: '/' },
    { label: 'Contact Us', to: '/' },
    { label: 'Bulk & Corporate Orders', to: '/' },
  ],
  Company: [
    { label: 'Our Story', to: '/' },
    { label: 'Sourcing & Sustainability', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
  ],
};

const TRUST_ITEMS = [
  { icon: Truck, label: 'Free Delivery', sub: 'On orders over Rs. 5,000' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '7-day return policy' },
  { icon: ShieldCheck, label: 'Secure Payments', sub: '256-bit SSL encryption' },
  { icon: Award, label: 'Quality Guaranteed', sub: 'Farm-fresh, lab tested' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Trust strip */}
      <div className="border-b border-gray-100 bg-brand-50/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 ring-1 ring-brand-100">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Leaf className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-lg font-bold tracking-tight text-brand-800">Kaju.live</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              Premium cashews and nut products, sourced directly from Sri Lankan
              farms and delivered fresh to your door.
            </p>
            <div className="mt-5 flex gap-2">
              {[FacebookIcon, InstagramIcon, XIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-300 hover:text-brand-700"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINK_COLUMNS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-gray-900">{heading}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 transition hover:text-brand-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Kaju.live. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="transition hover:text-brand-700">Privacy Policy</Link>
            <Link to="/" className="transition hover:text-brand-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
