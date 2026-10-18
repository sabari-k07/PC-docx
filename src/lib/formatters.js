/**
 * PC_DOCx Formatter Utilities
 * Indian Rupee (₹) & Hardware Metric Formatters
 */

/**
 * Format a number as Indian Rupee (INR) with standard Indian comma grouping:
 * e.g. 100000 -> ₹1,00,000
 */
export const formatINR = (amount = 0) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

// Alias for backwards compatibility
export const FORMAT_INR = formatINR;

/**
 * Format compact Indian Rupee (e.g. 125000 -> ₹1.25L, 45000 -> ₹45K)
 */
export const formatCompactINR = (amount = 0) => {
  const num = Number(amount) || 0;
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `₹${num}`;
};

/**
 * Format power in Watts (e.g. 438 -> "438W")
 */
export const formatWatts = (watts = 0) => {
  return `${Math.round(Number(watts) || 0)}W`;
};

/**
 * Format percentage (e.g. 94 -> "94%")
 */
export const formatPercent = (percent = 0) => {
  return `${Math.round(Number(percent) || 0)}%`;
};

/**
 * Format date in Indian locale (e.g. "18 Oct 2026, 11:15 PM")
 */
export const formatIndianDate = (date = new Date()) => {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
