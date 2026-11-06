import React from 'react';
import { Plus, Check, Ban } from 'lucide-react';
import { formatRupiah } from '../../domain/formatters/currencyFormatter';

export const MenuCard = ({
  item,
  pesananQty = 0,
  sisaStok = 0,
  onTambah,
}) => {
  const isOutOfStock = sisaStok <= 0;

  return (
    <article
      data-testid={`menu-card-${item.id}`}
      className={`flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        isOutOfStock
          ? 'border-slate-200 bg-slate-50/70 opacity-80'
          : 'border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-orange-100 text-orange-800">
            {item.kategori}
          </span>
          {isOutOfStock ? (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200"
              aria-label="Status menu: Habis"
            >
              <Ban className="w-3 h-3" aria-hidden="true" />
              Habis
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500">
              Sisa stok: <strong className="text-slate-800 font-semibold">{sisaStok}</strong>
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {item.nama}
        </h3>

        <div className="mt-2 text-orange-600 font-extrabold text-lg sm:text-xl">
          {formatRupiah(item.harga)}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        {pesananQty > 0 ? (
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Dipilih: {pesananQty}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400">
            {isOutOfStock ? 'Tidak tersedia' : 'Siap dipesan'}
          </span>
        )}

        <button
          type="button"
          onClick={() => onTambah(item)}
          disabled={isOutOfStock}
          aria-label={`Tambah ${item.nama} ke pesanan`}
          className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
            isOutOfStock
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
          }`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Tambah</span>
        </button>
      </div>
    </article>
  );
};

