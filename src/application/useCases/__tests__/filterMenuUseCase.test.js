import { describe, it, expect } from 'vitest';
import { filterMenu, extractCategories } from '../filterMenuUseCase';

const mockMenu = [
  { id: 'M01', nama: 'Nasi Ayam', kategori: 'Makanan', harga: 18000, stok: 8 },
  { id: 'M02', nama: 'Mie Goreng', kategori: 'Makanan', harga: 15000, stok: 6 },
  { id: 'M03', nama: 'Roti Bakar', kategori: 'Makanan', harga: 12000, stok: 4 },
  { id: 'M04', nama: 'Es Teh', kategori: 'Minuman', harga: 5000, stok: 10 },
  { id: 'M05', nama: 'Kopi Susu', kategori: 'Minuman', harga: 10000, stok: 0 },
  { id: 'M06', nama: 'Jus Jeruk', kategori: 'Minuman', harga: 8000, stok: 5 },
];

describe('Application Use Case: filterMenu', () => {
  it('extracts categories dynamically including Semua', () => {
    const cats = extractCategories(mockMenu);
    expect(cats).toEqual(['Semua', 'Makanan', 'Minuman']);
  });

  it('AC-03: typing "NASI" (case-insensitive) matches Nasi Ayam only', () => {
    const result = filterMenu(mockMenu, 'NASI', 'Semua');
    expect(result).toHaveLength(1);
    expect(result[0].nama).toBe('Nasi Ayam');
  });

  it('AC-04: filtering Minuman and typing "es" returns Es Teh only', () => {
    const result = filterMenu(mockMenu, 'es', 'Minuman');
    expect(result).toHaveLength(1);
    expect(result[0].nama).toBe('Es Teh');
  });

  it('AC-05: searching for "xyz" returns 0 items', () => {
    const result = filterMenu(mockMenu, 'xyz', 'Semua');
    expect(result).toHaveLength(0);
  });

  it('returns all items when keyword is empty and category is Semua', () => {
    const result = filterMenu(mockMenu, '', 'Semua');
    expect(result).toHaveLength(6);
  });

  it('filters by category Makanan only', () => {
    const result = filterMenu(mockMenu, '', 'Makanan');
    expect(result).toHaveLength(3);
    expect(result.every((item) => item.kategori === 'Makanan')).toBe(true);
  });
});

