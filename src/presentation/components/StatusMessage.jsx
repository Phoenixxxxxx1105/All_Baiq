import React from 'react';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

export const StatusMessage = ({ status, pesan, onRetry }) => {
  if (status === 'loading') {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200 text-center my-8"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-3" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-slate-800">Memuat Data Menu...</h2>
        <p className="text-sm text-slate-500 mt-1">Mengambil daftar hidangan kantin</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center my-8 shadow-sm"
        role="alert"
        aria-live="assertive"
      >
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-bold text-red-900 mb-1">
          Gagal Memuat Menu Kantin
        </h2>
        <p className="text-sm text-red-700 max-w-md mx-auto mb-5">
          {pesan || 'Terjadi kesalahan saat mengambil berkas menu. Pastikan koneksi atau berkas tersedia.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>Coba Lagi</span>
        </button>
      </div>
    );
  }

  return null;
};

