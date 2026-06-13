import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function AuthLayout({ icon: Icon, title, subtitle, children, footer, wide = false }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-brand-50/60 to-white px-4 py-12 sm:px-6">
      <div className={`w-full ${wide ? 'max-w-xl' : 'max-w-md'}`}>
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Leaf className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-lg font-bold tracking-tight text-brand-800">Kaju.live</span>
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6 text-center">
            {Icon && (
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
            )}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {children}
        </div>

        {footer && <p className="mt-6 text-center text-sm text-gray-600">{footer}</p>}
      </div>
    </div>
  );
}
