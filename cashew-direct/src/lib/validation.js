export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value) {
  const cleaned = value.replace(/[\s-]/g, '');
  return /^(?:\+94|0)7\d{8}$/.test(cleaned);
}

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_BAR_COLORS = ['bg-gray-200', 'bg-red-400', 'bg-amber-400', 'bg-brand-400', 'bg-brand-600'];
const STRENGTH_TEXT_COLORS = ['text-gray-400', 'text-red-500', 'text-amber-600', 'text-brand-600', 'text-brand-700'];

export function getPasswordStrength(value) {
  if (!value) return { score: 0, label: '', barColor: STRENGTH_BAR_COLORS[0], textColor: STRENGTH_TEXT_COLORS[0] };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[0-9]/.test(value) && /[a-zA-Z]/.test(value)) score += 1;
  if (/[^a-zA-Z0-9]/.test(value)) score += 1;
  return {
    score,
    label: STRENGTH_LABELS[score],
    barColor: STRENGTH_BAR_COLORS[score],
    textColor: STRENGTH_TEXT_COLORS[score],
  };
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
