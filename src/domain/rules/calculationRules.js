export const DISCOUNT_THRESHOLD = 50000;
export const DISCOUNT_RATE = 0.10;

export const calculateRemainingStock = (initialStock = 0, orderedQuantity = 0) => {
  return Math.max(0, initialStock - (orderedQuantity || 0));
};

export const calculateTotalUnits = (orders = {}) => {
  return Object.values(orders).reduce((acc, qty) => acc + (qty || 0), 0);
};

export const calculateSubtotal = (orders = {}, menuList = []) => {
  const menuMap = new Map(menuList.map((item) => [item.id, item]));

  let subtotal = 0;
  for (const [id, qty] of Object.entries(orders)) {
    if (qty > 0) {
      const item = menuMap.get(id);
      if (item) {
        subtotal += item.harga * qty;
      }
    }
  }

  return subtotal;
};

export const calculateDiscount = (subtotal = 0) => {
  if (subtotal >= DISCOUNT_THRESHOLD) {
    return Math.round(subtotal * DISCOUNT_RATE);
  }
  return 0;
};

export const calculateTotal = (subtotal = 0, discount = 0) => {
  return Math.max(0, subtotal - discount);
};

export const calculateOrderSummary = (orders = {}, menuList = []) => {
  const totalUnits = calculateTotalUnits(orders);
  if (totalUnits === 0) {
    return {
      totalUnits: 0,
      subtotal: 0,
      diskon: 0,
      total: 0,
    };
  }

  const subtotal = calculateSubtotal(orders, menuList);
  const diskon = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, diskon);

  return {
    totalUnits,
    subtotal,
    diskon,
    total,
  };
};
