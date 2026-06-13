export function formatPrice(amount) {
  return `Rs. ${Math.round(amount).toLocaleString('en-US')}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
