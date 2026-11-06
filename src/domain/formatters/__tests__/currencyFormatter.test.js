import { describe, it, expect } from 'vitest';
import { formatRupiah } from '../currencyFormatter';

describe('Domain Formatter: formatRupiah', () => {
  it('formats values according to Indonesian Rupiah standard with period separator', () => {
    expect(formatRupiah(18000)).toBe('Rp18.000');
    expect(formatRupiah(45900)).toBe('Rp45.900');
    expect(formatRupiah(50000)).toBe('Rp50.000');
    expect(formatRupiah(5100)).toBe('Rp5.100');
    expect(formatRupiah(0)).toBe('Rp0');
  });

  it('handles edge inputs safely', () => {
    expect(formatRupiah(-100)).toBe('Rp0');
    expect(formatRupiah(null)).toBe('Rp0');
    expect(formatRupiah(undefined)).toBe('Rp0');
  });
});

