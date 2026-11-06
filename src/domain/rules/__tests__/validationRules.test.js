import { describe, it, expect } from 'vitest';
import { validateQuantity, validateIncrement } from '../validationRules';

describe('Domain Validation Rules (FR-06, BR-01, BR-06, BR-07)', () => {
  describe('validateQuantity', () => {
    it('accepts valid integer numbers within stock limit', () => {
      const result = validateQuantity(3, 8);
      expect(result.isValid).toBe(true);
      expect(result.value).toBe(3);
    });

    it('accepts valid string numbers within stock limit', () => {
      const result = validateQuantity('5', 8);
      expect(result.isValid).toBe(true);
      expect(result.value).toBe(5);
    });

    it('rejects 0 with reason "Jumlah harus bilangan bulat positif" (AC-08)', () => {
      const result = validateQuantity(0, 8);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Jumlah harus bilangan bulat positif');
    });

    it('rejects negative numbers with reason "Jumlah harus bilangan bulat positif" (AC-08)', () => {
      const result = validateQuantity(-1, 8);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Jumlah harus bilangan bulat positif');
    });

    it('rejects decimals (e.g. 1.5, 2.5) with reason "Jumlah harus bilangan bulat positif" (AC-08)', () => {
      const result = validateQuantity(1.5, 8);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Jumlah harus bilangan bulat positif');

      const resultStr = validateQuantity('2.5', 8);
      expect(resultStr.isValid).toBe(false);
      expect(resultStr.reason).toBe('Jumlah harus bilangan bulat positif');
    });

    it('rejects empty strings or non-numbers (AC-08)', () => {
      expect(validateQuantity('', 8).isValid).toBe(false);
      expect(validateQuantity('abc', 8).isValid).toBe(false);
      expect(validateQuantity(null, 8).isValid).toBe(false);
    });

    it('rejects quantity exceeding stock with reason "Jumlah melebihi stok (maksimal X)" (AC-07)', () => {
      const result = validateQuantity(9, 8);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Jumlah melebihi stok (maksimal 8)');
    });
  });

  describe('validateIncrement', () => {
    it('disallows adding to item with 0 initial stock (AC-09)', () => {
      const result = validateIncrement(0, 0);
      expect(result.canAdd).toBe(false);
      expect(result.reason).toBe('Stok menu habis');
    });

    it('allows increment when currentQty < initialStock', () => {
      const result = validateIncrement(2, 8);
      expect(result.canAdd).toBe(true);
    });

    it('disallows increment when currentQty >= initialStock', () => {
      const result = validateIncrement(8, 8);
      expect(result.canAdd).toBe(false);
      expect(result.reason).toBe('Jumlah melebihi stok (maksimal 8)');
    });
  });
});

