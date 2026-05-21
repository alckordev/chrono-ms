import { tryParse } from '../parse';

describe('tryParse()', () => {
  test('returns milliseconds for valid input', () => {
    expect(tryParse('2h')).toBe(7_200_000);
    expect(tryParse('30m')).toBe(1_800_000);
    expect(tryParse('1d')).toBe(86_400_000);
    expect(tryParse('1mo')).toBe(2_592_000_000);
  });

  test('returns null for invalid format', () => {
    expect(tryParse('invalid')).toBeNull();
    expect(tryParse('1x')).toBeNull();
    expect(tryParse('abc')).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(tryParse('')).toBeNull();
  });

  test('returns null for whitespace-only string', () => {
    expect(tryParse('   ')).toBeNull();
  });

  test('returns null when maxLength is exceeded', () => {
    expect(tryParse('1h', { maxLength: 1 })).toBeNull();
  });

  test('returns null when maxLength is invalid', () => {
    expect(tryParse('1h', { maxLength: 0 })).toBeNull();
    expect(tryParse('1h', { maxLength: -1 })).toBeNull();
  });

  test('handles negative values', () => {
    expect(tryParse('-1h')).toBe(-3_600_000);
  });

  test('handles decimal values', () => {
    expect(tryParse('1.5h')).toBe(5_400_000);
  });

  test('returns zero for "0"', () => {
    expect(tryParse('0')).toBe(0);
  });
});
