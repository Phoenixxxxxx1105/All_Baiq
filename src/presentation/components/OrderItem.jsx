import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatRupiah } from '../../domain/formatters/currencyFormatter';

export const OrderItem = ({
  item,
  onUbahJumlah,
  onHapus,
}) => {
  const [inputValue, setInputValue] = useState(String(item.jumlah));

  useEffect(() => {
    setInputValue(String(item.jumlah));
  }, [item.jumlah]);

  const commitChange = (valToCommit) => {
    const success = onUbahJumlah(item.id, valToCommit, item.stok);
    if (!success) {
      setInputValue(String(item.jumlah));
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue !== String(item.jumlah)) {
      commitChange(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleIncrement = () => {
    commitChange(item.jumlah + 1);
  };

  const handleDecrement = () => {
    if (item.jumlah > 1) {
      commitChange(item.jumlah - 1);
    } else {
      onHapus(item.id);
    }
  };

  return (
    <li
      data-testid={`order-item-${item.id}`}
      className="p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm truncate">
            {item.nama}
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
            {item.kategori}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5">
          {formatRupiah(item.harga)} / unit &bull; Maks: {item.stok}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
        <div className="flex items-center bg-white rounded-lg border border-slate-300 shadow-xs p-0.5">
          <button
            type="button"
            onClick={handleDecrement}
            aria-label={`Kurangi jumlah ${item.nama}`}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded active:scale-95 transition-all"
          >
            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <label htmlFor={`input-qty-${item.id}`} className="sr-only">
            Jumlah pesanan untuk {item.nama}
          </label>
          <input
            id={`input-qty-${item.id}`}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label={`Jumlah untuk ${item.nama}`}
            className="w-10 text-center font-bold text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded py-0.5"
          />

          <button
            type="button"
            onClick={handleIncrement}
            disabled={item.jumlah >= item.stok}
            aria-label={`Tambah jumlah ${item.nama}`}
            className={`w-7 h-7 flex items-center justify-center rounded active:scale-95 transition-all ${
              item.jumlah >= item.stok
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="text-right min-w-[75px]">
          <span className="block text-xs text-slate-400 font-medium sm:hidden">
            Subtotal
          </span>
          <span className="font-extrabold text-sm text-slate-900">
            {formatRupiah(item.subtotalBaris)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onHapus(item.id)}
          aria-label={`Hapus ${item.nama} dari daftar pesanan`}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Hapus pesanan"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
};
