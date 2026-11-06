import React from 'react';
import { Receipt, Tag, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '../../domain/formatters/currencyFormatter';
import { DISCOUNT_THRESHOLD } from '../../domain/rules/calculationRules';

export const OrderSummary = ({
  totalUnits = 0,
  subtotal = 0,
  diskon = 0,
  total = 0,
}) => {
  const hasDiscount = diskon > 0;
  const isEligible = subtotal >= DISCOUNT_THRESHOLD;
  const remainingForDiscount = Math.max(0, DISCOUNT_THRESHOLD - subtotal);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mt-4">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
          <Receipt className="w-5 h-5" aria-hidden="true" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Ringkasan Pesanan
        </h2>
      </div>

      <div className="mb-4">
        {isEligible ? (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Diskon 10% aktif! Hemat {formatRupiah(diskon)}</span>
          </div>
        ) : subtotal > 0 ? (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs font-medium text-amber-800">
            <Tag className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
            <span>
              Tambah <strong>{formatRupiah(remainingForDiscount)}</strong> lagi untuk diskon 10%!
            </span>
          </div>
        ) : (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
            GAADA DISKON
          </div>
        )}
      </div>

      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between items-center text-slate-600">
          <dt>Total Unit Item</dt>
          <dd className="font-semibold text-slate-800">{totalUnits} unit</dd>
        </div>

        <div className="flex justify-between items-center text-slate-600">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-slate-800">{formatRupiah(subtotal)}</dd>
        </div>

        <div className="flex justify-between items-center">
          <dt className="text-slate-600 flex items-center gap-1">
            <span>Diskon (10%)</span>
          </dt>
          <dd
            className={`font-semibold ${hasDiscount ? 'text-emerald-600' : 'text-slate-400'
              }`}
          >
            {hasDiscount ? `-${formatRupiah(diskon)}` : 'Rp0'}
          </dd>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <dt className="text-base font-bold text-slate-900">Total Pembayaran</dt>
          <dd className="text-xl sm:text-2xl font-extrabold text-orange-600">
            {formatRupiah(total)}
          </dd>
        </div>
      </dl>
    </div>
  );
};
