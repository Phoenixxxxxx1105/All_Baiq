import { describe, it, expect } from 'vitest';
import {
  calculateRemainingStock,
  calculateTotalUnits,
  calculateDiscount,
  calculateOrderSummary,
} from '../calculationRules';

const mockMenu = [
  { id: 'M01', nama: 'Nasi Ayam', kategori: 'Makanan', harga: 18000, stok: 8 },
  { id: 'M02', nama: 'Mie Goreng', kategori: 'Makanan', harga: 15000, stok: 6 },
  { id: 'M03', nama: 'Roti Bakar', kategori: 'Makanan', harga: 12000, stok: 4 },
  { id: 'M04', nama: 'Es Teh', kategori: 'Minuman', harga: 5000, stok: 10 },
  { id: 'M05', nama: 'Kopi Susu', kategori: 'Minuman', harga: 10000, stok: 0 },
  { id: 'M06', nama: 'Jus Jeruk', kategori: 'Minuman', harga: 8000, stok: 5 },
];

describe('Domain Calculation Rules', () => {
  describe('calculateRemainingStock (BR-08)', () => {
    it('returns stock awal when no orders placed', () => {
      expect(calculateRemainingStock(8, 0)).toBe(8);
    });

    it('returns remaining stock correctly when ordered', () => {
      expect(calculateRemainingStock(8, 2)).toBe(6);
      expect(calculateRemainingStock(8, 8)).toBe(0);
    });

    it('does not return negative numbers if ordered exceeds stock', () => {
      expect(calculateRemainingStock(8, 10)).toBe(0);
    });
  });

  describe('calculateTotalUnits', () => {
    it('returns 0 for empty order', () => {
      expect(calculateTotalUnits({})).toBe(0);
    });

    it('sums all unit quantities properly', () => {
      expect(calculateTotalUnits({ M01: 2, M04: 3 })).toBe(5);
    });
  });

  describe('calculateSubtotal & calculateDiscount & calculateTotal (BR-02, BR-03, BR-04)', () => {
    it('AC-14: returns 0 across summary for empty orders', () => {
      const summary = calculateOrderSummary({}, mockMenu);
      expect(summary).toEqual({
        totalUnits: 0,
        subtotal: 0,
        diskon: 0,
        total: 0,
      });
    });

    it('Example 1: Nasi Ayam x2 -> Subtotal 36.000, Diskon 0, Total 36.000', () => {
      const orders = { M01: 2 };
      const summary = calculateOrderSummary(orders, mockMenu);
      expect(summary.totalUnits).toBe(2);
      expect(summary.subtotal).toBe(36000);
      expect(summary.diskon).toBe(0);
      expect(summary.total).toBe(36000);
    });

    it('Example 2 / AC-10: Nasi Ayam x2 + Mie Goreng x1 -> Subtotal 51.000, Diskon 5.100, Total 45.900', () => {
      const orders = { M01: 2, M02: 1 };
      const summary = calculateOrderSummary(orders, mockMenu);
      expect(summary.totalUnits).toBe(3);
      expect(summary.subtotal).toBe(51000);
      expect(summary.diskon).toBe(5100);
      expect(summary.total).toBe(45900);
    });

    it('Example 3: Mie Goreng x2 + Roti Bakar x2 -> Subtotal 54.000, Diskon 5.400, Total 48.600', () => {
      const orders = { M02: 2, M03: 2 };
      const summary = calculateOrderSummary(orders, mockMenu);
      expect(summary.totalUnits).toBe(4);
      expect(summary.subtotal).toBe(54000);
      expect(summary.diskon).toBe(5400);
      expect(summary.total).toBe(48600);
    });

    it('Boundary Case: Subtotal tepat 50.000 -> Diskon 5.000 (10%), Total 45.000', () => {
      const orders = { M04: 10 };
      const summary = calculateOrderSummary(orders, mockMenu);
      expect(summary.subtotal).toBe(50000);
      expect(summary.diskon).toBe(5000);
      expect(summary.total).toBe(45000);
    });

    it('Boundary Case: Subtotal 49.999 -> Diskon 0', () => {
      expect(calculateDiscount(49999)).toBe(0);
      expect(calculateDiscount(50000)).toBe(5000);
    });
  });
});
