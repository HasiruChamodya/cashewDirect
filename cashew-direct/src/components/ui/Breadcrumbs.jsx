import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
      <Link to="/" className="flex items-center text-gray-400 transition hover:text-brand-700">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 min-w-0">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          {item.to ? (
            <Link to={item.to} className="truncate transition hover:text-brand-700">
              {item.label}
            </Link>
          ) : (
            <span className="truncate font-medium text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
