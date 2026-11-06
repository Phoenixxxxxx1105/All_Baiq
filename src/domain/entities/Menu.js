export const CATEGORY_ALL = 'Semua';

export const isValidMenuItem = (item) => {
  return (
    typeof item?.id === 'string' &&
    typeof item?.nama === 'string' &&
    typeof item?.kategori === 'string' &&
    typeof item?.harga === 'number' &&
    typeof item?.stok === 'number'
  );
};
