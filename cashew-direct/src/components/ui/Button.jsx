import { Link } from 'react-router-dom';

const VARIANTS = {
  primary:
    'bg-brand-500 text-white border border-brand-500 hover:bg-brand-600 hover:border-brand-600 focus-visible:ring-brand-500/40',
  secondary:
    'bg-brand-800 text-white border border-brand-800 hover:bg-brand-900 hover:border-brand-900 focus-visible:ring-brand-800/30',
  outline:
    'bg-white text-brand-800 border border-gray-300 hover:border-brand-500 hover:text-brand-700 focus-visible:ring-brand-500/30',
  ghost:
    'bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300',
  danger:
    'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus-visible:ring-red-300',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2',
};

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  children,
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-4',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-none',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Component = as || 'button';
  return (
    <Component className={classes} disabled={disabled} {...props}>
      {children}
    </Component>
  );
}
