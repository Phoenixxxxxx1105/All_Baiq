import { useState, useMemo, useCallback } from 'react';
import {
  calculateRemainingStock,
  calculateOrderSummary,
} from '../../domain/rules/calculationRules';
import {
  validateQuantity,
  validateIncrement,
} from '../../domain/rules/validationRules';

export const useCart = (menuList = []) => {
  const [orders, setOrders] = useState({});
  const [pesanError, setPesanError] = useState('');

  const menuMap = useMemo(() => {
    return new Map(menuList.map((item) => [item.id, item]));
  }, [menuList]);

  const getSisaStok = useCallback(
    (id, initialStock) => {
      const orderedQty = orders[id] || 0;
      return calculateRemainingStock(initialStock, orderedQty);
    },
    [orders]
  );

  const tambahPesanan = useCallback(
    (item) => {
      if (!item) return;
      const currentQty = orders[item.id] || 0;
      const validation = validateIncrement(currentQty, item.stok);

      if (!validation.canAdd) {
        setPesanError(validation.reason || 'Tidak dapat menambah pesanan');
        return false;
      }

      setOrders((prev) => ({
        ...prev,
        [item.id]: currentQty + 1,
      }));
      setPesanError('');
      return true;
    },
    [orders]
  );

  const ubahJumlah = useCallback(
    (id, rawValue, initialStock) => {
      const validation = validateQuantity(rawValue, initialStock);

      if (!validation.isValid) {
        setPesanError(validation.reason || 'Input jumlah tidak valid');
        return false;
      }

      setOrders((prev) => ({
        ...prev,
        [id]: validation.value,
      }));
      setPesanError('');
      return true;
    },
    []
  );

  const kurangiJumlah = useCallback(
    (id) => {
      const currentQty = orders[id] || 0;
      if (currentQty <= 1) {
        setOrders((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      } else {
        setOrders((prev) => ({
          ...prev,
          [id]: currentQty - 1,
        }));
      }
      setPesanError('');
    },
    [orders]
  );

  const hapusPesanan = useCallback((id) => {
    setOrders((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPesanError('');
  }, []);

  const clearPesanError = useCallback(() => {
    setPesanError('');
  }, []);

  const orderItems = useMemo(() => {
    const list = [];
    for (const [id, jumlah] of Object.entries(orders)) {
      if (jumlah > 0) {
        const item = menuMap.get(id);
        if (item) {
          list.push({
            id: item.id,
            nama: item.nama,
            kategori: item.kategori,
            harga: item.harga,
            stok: item.stok,
            jumlah,
            subtotalBaris: item.harga * jumlah,
          });
        }
      }
    }
    return list;
  }, [orders, menuMap]);

  const summary = useMemo(() => {
    return calculateOrderSummary(orders, menuList);
  }, [orders, menuList]);

  return {
    orders,
    orderItems,
    pesanError,
    setPesanError,
    clearPesanError,
    tambahPesanan,
    ubahJumlah,
    kurangiJumlah,
    hapusPesanan,
    getSisaStok,
    summary,
  };
};
