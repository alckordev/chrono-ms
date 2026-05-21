import { format } from '../format';

describe('format()', () => {
  describe('short format (default)', () => {
    test('milliseconds', () => {
      expect(format(100)).toBe('100ms');
      expect(format(0)).toBe('0ms');
    });

    test('seconds', () => {
      expect(format(1_000)).toBe('1s');
      expect(format(30_000)).toBe('30s');
    });

    test('minutes', () => {
      expect(format(60_000)).toBe('1m');
      expect(format(1_800_000)).toBe('30m');
    });

    test('hours', () => {
      expect(format(3_600_000)).toBe('1h');
      expect(format(7_200_000)).toBe('2h');
    });

    test('days', () => {
      expect(format(86_400_000)).toBe('1d');
      expect(format(172_800_000)).toBe('2d');
    });

    test('weeks', () => {
      expect(format(604_800_000)).toBe('1w');
      expect(format(1_209_600_000)).toBe('2w');
    });

    test('years', () => {
      expect(format(31_557_600_000)).toBe('1y');
      expect(format(63_115_200_000)).toBe('2y');
    });
  });

  describe('long format', () => {
    test('milliseconds', () => {
      expect(format(0, { long: true })).toBe('0 ms');
      expect(format(100, { long: true })).toBe('100 ms');
    });

    test('seconds singular and plural', () => {
      expect(format(1_000, { long: true })).toBe('1 second');
      expect(format(2_000, { long: true })).toBe('2 seconds');
    });

    test('minutes singular and plural', () => {
      expect(format(60_000, { long: true })).toBe('1 minute');
      expect(format(120_000, { long: true })).toBe('2 minutes');
    });

    test('hours singular and plural', () => {
      expect(format(3_600_000, { long: true })).toBe('1 hour');
      expect(format(7_200_000, { long: true })).toBe('2 hours');
    });

    test('days singular and plural', () => {
      expect(format(86_400_000, { long: true })).toBe('1 day');
      expect(format(172_800_000, { long: true })).toBe('2 days');
    });

    test('weeks singular and plural', () => {
      expect(format(604_800_000, { long: true })).toBe('1 week');
      expect(format(1_209_600_000, { long: true })).toBe('2 weeks');
    });

    test('years singular and plural', () => {
      expect(format(31_557_600_000, { long: true })).toBe('1 year');
      expect(format(63_115_200_000, { long: true })).toBe('2 years');
    });
  });

  describe('verbose format', () => {
    test('decomposes hours and minutes', () => {
      expect(format(5_400_000, { verbose: true })).toBe('1h 30m');
    });

    test('decomposes hours and minutes in long form', () => {
      expect(format(5_400_000, { verbose: true, long: true })).toBe(
        '1 hour 30 minutes'
      );
    });

    test('decomposes minutes and seconds', () => {
      expect(format(90_000, { verbose: true })).toBe('1m 30s');
    });

    test('decomposes three components', () => {
      expect(format(3_661_000, { verbose: true })).toBe('1h 1m 1s');
    });

    test('decomposes with remaining milliseconds (short)', () => {
      expect(format(1_500, { verbose: true })).toBe('1s 500ms');
    });

    test('decomposes with remaining milliseconds (long)', () => {
      expect(format(1_500, { verbose: true, long: true })).toBe(
        '1 second 500 ms'
      );
    });

    test('returns 0ms for zero input', () => {
      expect(format(0, { verbose: true })).toBe('0ms');
    });

    test('single unit returns just that unit', () => {
      expect(format(3_600_000, { verbose: true })).toBe('1h');
    });

    test('decomposes weeks and days', () => {
      expect(format(691_200_000, { verbose: true })).toBe('1w 1d');
    });
  });

  describe('negative values', () => {
    test('short format preserves sign', () => {
      expect(format(-1_000)).toBe('-1s');
      expect(format(-3_600_000)).toBe('-1h');
    });

    test('long format preserves sign', () => {
      expect(format(-60_000, { long: true })).toBe('-1 minute');
    });

    test('verbose format prefixes result with dash', () => {
      expect(format(-5_400_000, { verbose: true })).toBe('-1h 30m');
    });
  });

  describe('rounding behavior', () => {
    test('rounds to nearest unit for short format', () => {
      expect(format(90_000)).toBe('2m');
    });

    test('very large numbers fall into years', () => {
      expect(format(999_999_999_999)).toMatch(/^\d+y$/);
    });
  });

  describe('error cases', () => {
    test('throws for NaN', () => {
      expect(() => format(NaN)).toThrow('Value must be a finite number');
    });

    test('throws for Infinity', () => {
      expect(() => format(Infinity)).toThrow('Value must be a finite number');
    });

    test('throws for -Infinity', () => {
      expect(() => format(-Infinity)).toThrow('Value must be a finite number');
    });
  });
});
