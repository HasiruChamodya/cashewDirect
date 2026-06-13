import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const dims = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  const widthClass = size === 'sm' ? 'w-9' : 'w-12';

  function dec() {
    if (value > min) onChange(value - 1);
  }
  function inc() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${dims} flex items-center justify-center rounded-l-lg text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`${widthClass} ${textSize} flex h-11 items-center justify-center border-x border-gray-200 font-semibold text-gray-900`}>
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${dims} flex items-center justify-center rounded-r-lg text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
