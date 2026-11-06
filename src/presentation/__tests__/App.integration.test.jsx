import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../../App';

const mockMenuData = [
  { id: 'M01', nama: 'Nasi Ayam', kategori: 'Makanan', harga: 18000, stok: 8 },
  { id: 'M02', nama: 'Mie Goreng', kategori: 'Makanan', harga: 15000, stok: 6 },
  { id: 'M03', nama: 'Roti Bakar', kategori: 'Makanan', harga: 12000, stok: 4 },
  { id: 'M04', nama: 'Es Teh', kategori: 'Minuman', harga: 5000, stok: 10 },
  { id: 'M05', nama: 'Kopi Susu', kategori: 'Minuman', harga: 10000, stok: 0 },
  { id: 'M06', nama: 'Jus Jeruk', kategori: 'Minuman', harga: 8000, stok: 5 },
];

describe('App Acceptance Criteria (AC-01 to AC-16)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMenuData,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('AC-01: Buka aplikasi -> memuat tampil lalu 6 menu muncul', async () => {
    render(<App />);

    expect(screen.getByText(/Memuat Data Menu.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Nasi Ayam')).toBeInTheDocument();
    });

    expect(screen.getByText('Mie Goreng')).toBeInTheDocument();
    expect(screen.getByText('Roti Bakar')).toBeInTheDocument();
    expect(screen.getByText('Es Teh')).toBeInTheDocument();
    expect(screen.getByText('Kopi Susu')).toBeInTheDocument();
    expect(screen.getByText('Jus Jeruk')).toBeInTheDocument();
    expect(screen.getByTestId('jumlah-hasil')).toHaveTextContent('Menampilkan 6 menu');
  });

  it('AC-02: Gagal fetch -> Pesan error & tombol Coba Lagi tampil; Coba Lagi memuat data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Gagal Memuat Menu Kantin/i)).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole('button', { name: /Coba Lagi/i });
    expect(retryBtn).toBeInTheDocument();

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMenuData,
    }));

    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByText('Nasi Ayam')).toBeInTheDocument();
    });
  });

  it('AC-03: Ketik "NASI" (case-insensitive) -> Hanya Nasi Ayam tampil; jumlah hasil 1', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Cari Menu/i);
    fireEvent.change(searchInput, { target: { value: 'NASI' } });

    expect(screen.getByText('Nasi Ayam')).toBeInTheDocument();
    expect(screen.queryByText('Mie Goreng')).not.toBeInTheDocument();
    expect(screen.getByTestId('jumlah-hasil')).toHaveTextContent('Menampilkan 1 menu');
  });

  it('AC-04: Filter Minuman, cari "es" -> Hanya Es Teh tampil', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const categorySelect = screen.getByLabelText(/Kategori/i);
    fireEvent.change(categorySelect, { target: { value: 'Minuman' } });

    const searchInput = screen.getByLabelText(/Cari Menu/i);
    fireEvent.change(searchInput, { target: { value: 'es' } });

    expect(screen.getByText('Es Teh')).toBeInTheDocument();
    expect(screen.queryByText('Nasi Ayam')).not.toBeInTheDocument();
    expect(screen.queryByText('Jus Jeruk')).not.toBeInTheDocument();
    expect(screen.getByTestId('jumlah-hasil')).toHaveTextContent('Menampilkan 1 menu');
  });

  it('AC-05: Cari "xyz" -> Pesan tidak ada data yang cocok tampil', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Cari Menu/i);
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(screen.getByText(/Menu tidak ditemukan/i)).toBeInTheDocument();
    expect(screen.getByTestId('jumlah-hasil')).toHaveTextContent('Menampilkan 0 menu');
  });

  it('AC-06: Tambah Nasi Ayam dua kali -> Satu baris dengan jumlah 2; sisa stok menjadi 6', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });

    fireEvent.click(tambahNasiBtn);
    fireEvent.click(tambahNasiBtn);

    const orderItems = screen.getAllByTestId('order-item-M01');
    expect(orderItems).toHaveLength(1);

    const qtyInput = screen.getByLabelText(/Jumlah pesanan untuk Nasi Ayam/i);
    expect(qtyInput).toHaveValue('2');

    const nasiCard = screen.getByTestId('menu-card-M01');
    expect(nasiCard).toHaveTextContent(/Sisa stok: 6/i);
  });

  it('AC-07: Ubah jumlah Nasi Ayam menjadi 9 (melebihi stok 8) -> Ditolak dengan alasan; jumlah tetap', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });
    fireEvent.click(tambahNasiBtn);

    const qtyInput = screen.getByLabelText(/Jumlah pesanan untuk Nasi Ayam/i);
    expect(qtyInput).toHaveValue('1');

    fireEvent.change(qtyInput, { target: { value: '9' } });
    fireEvent.blur(qtyInput);

    expect(screen.getByRole('alert')).toHaveTextContent(/Jumlah melebihi stok \(maksimal 8\)/i);

    expect(qtyInput).toHaveValue('1');
  });

  it('AC-08: Ubah jumlah menjadi 0, -1, atau 1.5 -> Ditolak; jumlah tetap', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });
    fireEvent.click(tambahNasiBtn);

    const qtyInput = screen.getByLabelText(/Jumlah pesanan untuk Nasi Ayam/i);

    fireEvent.change(qtyInput, { target: { value: '0' } });
    fireEvent.blur(qtyInput);
    expect(screen.getByRole('alert')).toHaveTextContent(/Jumlah harus bilangan bulat positif/i);
    expect(qtyInput).toHaveValue('1');

    fireEvent.change(qtyInput, { target: { value: '-1' } });
    fireEvent.blur(qtyInput);
    expect(screen.getByRole('alert')).toHaveTextContent(/Jumlah harus bilangan bulat positif/i);
    expect(qtyInput).toHaveValue('1');

    fireEvent.change(qtyInput, { target: { value: '1.5' } });
    fireEvent.blur(qtyInput);
    expect(screen.getByRole('alert')).toHaveTextContent(/Jumlah harus bilangan bulat positif/i);
    expect(qtyInput).toHaveValue('1');
  });

  it('AC-09: Kopi Susu (stok 0) -> Tombol Tambah nonaktif dan ada tanda Habis', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Kopi Susu')).toBeInTheDocument());

    const kopiCard = screen.getByTestId('menu-card-M05');
    expect(kopiCard).toHaveTextContent(/Habis/i);

    const tambahKopiBtn = screen.getByRole('button', { name: /Tambah Kopi Susu ke pesanan/i });
    expect(tambahKopiBtn).toBeDisabled();
  });

  it('AC-10 & AC-11: Nasi Ayam x2 + Mie Goreng x1 -> Subtotal 51.000, diskon 5.100, total 45.900; kurangi mie goreng -> diskon hilang', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });
    const tambahMieBtn = screen.getByRole('button', { name: /Tambah Mie Goreng ke pesanan/i });

    fireEvent.click(tambahNasiBtn);
    fireEvent.click(tambahNasiBtn);

    fireEvent.click(tambahMieBtn);

    expect(screen.getByText('3 unit')).toBeInTheDocument();
    expect(screen.getByText('Rp51.000')).toBeInTheDocument();
    expect(screen.getByText('-Rp5.100')).toBeInTheDocument();
    expect(screen.getByText('Rp45.900')).toBeInTheDocument();

    const hapusMieBtn = screen.getByRole('button', { name: /Hapus Mie Goreng dari daftar pesanan/i });
    fireEvent.click(hapusMieBtn);

    expect(screen.getByText('2 unit')).toBeInTheDocument();
    expect(screen.getAllByText('Rp36.000').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Rp0')).toBeInTheDocument();
  });

  it('AC-12: Hapus baris pesanan mengembalikan sisa stok', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });
    fireEvent.click(tambahNasiBtn);
    fireEvent.click(tambahNasiBtn);

    const nasiCard = screen.getByTestId('menu-card-M01');
    expect(nasiCard).toHaveTextContent(/Sisa stok: 6/i);

    const hapusNasiBtn = screen.getByRole('button', { name: /Hapus Nasi Ayam dari daftar pesanan/i });
    fireEvent.click(hapusNasiBtn);

    expect(nasiCard).toHaveTextContent(/Sisa stok: 8/i);
    expect(screen.getByText(/Belum ada pesanan/i)).toBeInTheDocument();
  });

  it('AC-13: Pesanan terisi lalu ubah filter atau pencarian -> Pesanan & ringkasan tidak hilang', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const tambahNasiBtn = screen.getByRole('button', { name: /Tambah Nasi Ayam ke pesanan/i });
    fireEvent.click(tambahNasiBtn);

    const categorySelect = screen.getByLabelText(/Kategori/i);
    fireEvent.change(categorySelect, { target: { value: 'Minuman' } });

    expect(screen.queryByTestId('menu-card-M01')).not.toBeInTheDocument();

    expect(screen.getByTestId('order-item-M01')).toBeInTheDocument();
    expect(screen.getByText('1 unit')).toBeInTheDocument();
    expect(screen.getAllByText('Rp18.000').length).toBeGreaterThanOrEqual(1);
  });

  it('AC-14: Pesanan kosong -> subtotal, diskon, total, dan unit bernilai 0', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    expect(screen.getByText('0 unit')).toBeInTheDocument();
    expect(screen.getAllByText('Rp0')).toHaveLength(3);
    expect(screen.getByText(/Belum ada pesanan/i)).toBeInTheDocument();
  });

  it('AC-16: Periksa input pencarian dan filter -> Keduanya memiliki label yang jelas', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Nasi Ayam')).toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Cari Menu/i);
    const categorySelect = screen.getByLabelText(/Kategori/i);

    expect(searchInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
  });
});
