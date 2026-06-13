export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

export default function Input({ className = '', error, ...props }) {
  return (
    <input
      className={`h-11 w-full rounded-lg border px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-4 ${
        error
          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
          : 'border-gray-300 focus:border-brand-500 focus:ring-brand-500/15'
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <div className="relative">
      <select
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 pr-9 text-sm text-gray-900 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 ${className}`}
      {...props}
    />
  );
}
