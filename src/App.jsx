import React from 'react';
import { Header } from './presentation/components/Header';
import { FilterBar } from './presentation/components/FilterBar';
import { MenuList } from './presentation/components/MenuList';
import { OrderList } from './presentation/components/OrderList';
import { OrderSummary } from './presentation/components/OrderSummary';
import { StatusMessage } from './presentation/components/StatusMessage';
import { useMenu } from './application/hooks/useMenu';
import { useMenuFilter } from './application/hooks/useMenuFilter';
import { useCart } from './application/hooks/useCart';

export function App() {
  const { menu, status, errorMessage, retry } = useMenu();
  const {
    keyword,
    setKeyword,
    kategori,
    setKategori,
    categories,
    filteredMenu,
    jumlahHasil,
  } = useMenuFilter(menu);

  const {
    orders,
    orderItems,
    pesanError,
    clearPesanError,
    tambahPesanan,
    ubahJumlah,
    hapusPesanan,
    getSisaStok,
    summary,
  } = useCart(menu);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {status === 'loading' && <StatusMessage status="loading" />}

        {status === 'error' && (
          <StatusMessage status="error" pesan={errorMessage} onRetry={retry} />
        )}

        {status === 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <section className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <FilterBar
                keyword={keyword}
                kategori={kategori}
                daftarKategori={categories}
                onKeywordChange={setKeyword}
                onKategoriChange={setKategori}
                jumlahHasil={jumlahHasil}
              />

              <MenuList
                menu={filteredMenu}
                pesanan={orders}
                getSisaStok={getSisaStok}
                onTambah={tambahPesanan}
              />
            </section>

            <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 flex flex-col">
              <OrderList
                orderItems={orderItems}
                onUbahJumlah={ubahJumlah}
                onHapus={hapusPesanan}
                pesanError={pesanError}
                onClearPesanError={clearPesanError}
              />

              <OrderSummary
                totalUnits={summary.totalUnits}
                subtotal={summary.subtotal}
                diskon={summary.diskon}
                total={summary.total}
              />
            </aside>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>Kantin Kampus &bull; COTS 1 RPL-02 &bull; Kelompok 1</p>
      </footer>
    </div>
  );
}

export default App;
