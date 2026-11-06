import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export const FilterBar = ({
  keyword = '',
  kategori = 'Semua',
  daftarKategori = ['Semua'],
  onKeywordChange,
  onKategoriChange,
  jumlahHasil = 0,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end justify-between">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="search-menu-input"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Cari Menu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="search-menu-input"
              type="text"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="Cari berdasarkan nama menu..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => onKeywordChange('')}
                aria-label="Hapus kata kunci pencarian"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="min-w-[180px]">
          <label
            htmlFor="filter-kategori-select"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Kategori
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="filter-kategori-select"
              value={kategori}
              onChange={(e) => onKategoriChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all cursor-pointer appearance-none"
            >
              {daftarKategori.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span
          data-testid="jumlah-hasil"
          className="font-medium text-slate-700"
        >
          Menampilkan {jumlahHasil} menu
        </span>
        {(keyword || (kategori && kategori !== 'Semua')) && (
          <button
            type="button"
            onClick={() => {
              onKeywordChange('');
              onKategoriChange('Semua');
            }}
            className="text-orange-600 hover:text-orange-700 font-medium underline transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
};
