import React from 'react';
import { MenuCard } from './MenuCard';
import { SearchX } from 'lucide-react';

export const MenuList = ({
  menu = [],
  pesanan = {},
  getSisaStok,
  onTambah,
}) => {
  if (menu.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200 text-center"
        role="region"
        aria-label="Katalog Menu Kosong"
      >
        <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-400 mb-3">
          <SearchX className="w-7 h-7" aria-hidden="true" />
        </div>
        <h3 className="text-base font-bold text-slate-800">Menu tidak ditemukan</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Tidak ada hidangan yang cocok dengan kata kunci atau filter kategori yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Daftar Menu Kantin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {menu.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            pesananQty={pesanan[item.id] || 0}
            sisaStok={getSisaStok(item.id, item.stok)}
            onTambah={onTambah}
          />
        ))}
      </div>
    </section>
  );
};

