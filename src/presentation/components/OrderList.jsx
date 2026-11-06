import React from 'react';
import { OrderItem } from './OrderItem';
import { ShoppingBag, AlertCircle, X } from 'lucide-react';

export const OrderList = ({
  orderItems = [],
  onUbahJumlah,
  onHapus,
  pesanError = '',
  onClearPesanError,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Daftar Pesanan
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {orderItems.length} menu
        </span>
      </div>

      {pesanError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start justify-between gap-2 text-xs font-medium animate-fadeIn"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{pesanError}</span>
          </div>
          {onClearPesanError && (
            <button
              type="button"
              onClick={onClearPesanError}
              aria-label="Tutup pesan peringatan"
              className="text-rose-500 hover:text-rose-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {orderItems.length === 0 ? (
        <div
          className="py-8 text-center text-slate-400"
          role="region"
          aria-label="Pesanan Kosong"
        >
          <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" aria-hidden="true" />
          <p className="text-sm font-semibold text-slate-600">Belum ada pesanan</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Pilih menu dari katalog di sebelah kiri untuk mulai memesan
          </p>
        </div>
      ) : (
        <ul className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {orderItems.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              onUbahJumlah={onUbahJumlah}
              onHapus={onHapus}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
