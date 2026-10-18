/**
 * PC_DOCx Formatter Utilities
 * Native Indian Rupee (₹) formatting (en-IN locale for lakhs/thousands separation).
 */

export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FORMAT_INR = formatINR;

export const formatCompactINR = (amount = 0) => {
  const num = Number(amount) || 0;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return `₹${num}`;
};

export const formatWatts = (watts = 0) => `${Math.round(Number(watts) || 0)}W`;
export const formatPercent = (percent = 0) => `${Math.round(Number(percent) || 0)}%`;

export default formatINR;
