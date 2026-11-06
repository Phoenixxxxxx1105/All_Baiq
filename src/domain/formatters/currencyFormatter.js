export const formatRupiah = (amount) => {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  const formattedNumber = new Intl.NumberFormat('id-ID').format(safeAmount);
  return `Rp${formattedNumber}`;
};
