
// export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
// export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// export const formatCurrency = (price) => {
//  if (typeof price !== 'number') price = Number(price) || 0;
//  return `$${price.toFixed(2)}`;
// };

// export const calculateTotal = (items) => {
//  if (!Array.isArray(items)) return 0;
//  return items.reduce(
//   (total, item) =>
//    total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//   0
//  );
// };
export const formatCurrency = (price) => {
  if (typeof price !== 'number') price = Number(price) || 0;
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    minimumFractionDigits: 2 
  }).format(price);
};

export const calculateTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
};
