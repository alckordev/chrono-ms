import { parse } from '../parse';

describe('parse()', () => {
  describe('milliseconds', () => {
    test('bare number defaults to ms', () => {
      expect(parse('100')).toBe(100);
    });

    test('ms suffix', () => {
      expect(parse('100ms')).toBe(100);
      expect(parse('100msec')).toBe(100);
      expect(parse('100msecs')).toBe(100);
      expect(parse('100millisecond')).toBe(100);
      expect(parse('100milliseconds')).toBe(100);
    });
  });

  describe('seconds', () => {
    test('short aliases', () => {
      expect(parse('1s')).toBe(1_000);
      expect(parse('1sec')).toBe(1_000);
      expect(parse('1secs')).toBe(1_000);
    });

    test('long form', () => {
      expect(parse('1 second')).toBe(1_000);
      expect(parse('2 seconds')).toBe(2_000);
    });
  });

  describe('minutes', () => {
    test('short aliases', () => {
      expect(parse('1m')).toBe(60_000);
      expect(parse('1min')).toBe(60_000);
      expect(parse('1mins')).toBe(60_000);
    });

    test('long form', () => {
      expect(parse('1 minute')).toBe(60_000);
      expect(parse('2 minutes')).toBe(120_000);
    });
  });

  describe('hours', () => {
    test('short aliases', () => {
      expect(parse('1h')).toBe(3_600_000);
      expect(parse('1hr')).toBe(3_600_000);
      expect(parse('1hrs')).toBe(3_600_000);
    });

    test('long form', () => {
      expect(parse('1 hour')).toBe(3_600_000);
      expect(parse('2 hours')).toBe(7_200_000);
    });
  });

  describe('days', () => {
    test('short alias', () => {
      expect(parse('1d')).toBe(86_400_000);
    });

    test('long form', () => {
      expect(parse('1 day')).toBe(86_400_000);
      expect(parse('2 days')).toBe(172_800_000);
    });
  });

  describe('weeks', () => {
    test('short alias', () => {
      expect(parse('1w')).toBe(604_800_000);
    });

    test('long form', () => {
      expect(parse('1 week')).toBe(604_800_000);
      expect(parse('2 weeks')).toBe(1_209_600_000);
    });
  });

  describe('months', () => {
    test('short alias mo', () => {
      expect(parse('1mo')).toBe(2_592_000_000);
    });

    test('long form', () => {
      expect(parse('1 month')).toBe(2_592_000_000);
      expect(parse('6 months')).toBe(15_552_000_000);
    });

    test('month does not conflict with minute (m)', () => {
      expect(parse('1m')).toBe(60_000);
      expect(parse('1mo')).toBe(2_592_000_000);
    });
  });

  describe('years', () => {
    test('short aliases', () => {
      expect(parse('1y')).toBe(31_557_600_000);
      expect(parse('1yr')).toBe(31_557_600_000);
      expect(parse('1yrs')).toBe(31_557_600_000);
    });

    test('long form', () => {
      expect(parse('1 year')).toBe(31_557_600_000);
      expect(parse('2 years')).toBe(63_115_200_000);
    });
  });

  describe('special numeric cases', () => {
    test('negative values', () => {
      expect(parse('-1h')).toBe(-3_600_000);
      expect(parse('-30m')).toBe(-1_800_000);
    });

    test('decimal values', () => {
      expect(parse('1.5h')).toBe(5_400_000);
      expect(parse('0.5d')).toBe(43_200_000);
    });

    test('zero', () => {
      expect(parse('0')).toBe(0);
      expect(parse('0ms')).toBe(0);
    });
  });

  describe('case insensitivity', () => {
    test('uppercase unit', () => {
      expect(parse('1H')).toBe(parse('1h'));
      expect(parse('1M')).toBe(parse('1m'));
      expect(parse('1S')).toBe(parse('1s'));
    });

    test('mixed case', () => {
      expect(parse('1HOUR')).toBe(3_600_000);
      expect(parse('1Hours')).toBe(3_600_000);
    });
  });

  describe('whitespace handling', () => {
    test('space between number and unit is optional', () => {
      expect(parse('1 h')).toBe(parse('1h'));
      expect(parse('30 m')).toBe(parse('30m'));
    });

    test('strings with only whitespace throw', () => {
      expect(() => parse('   ')).toThrow('Value must be a non-empty string');
    });
  });

  describe('maxLength option', () => {
    test('throws when string exceeds default limit of 100', () => {
      expect(() => parse('a'.repeat(101))).toThrow('String too long');
    });

    test('respects custom maxLength', () => {
      expect(() => parse('1h', { maxLength: 1 })).toThrow('String too long');
    });

    test('throws when maxLength is zero', () => {
      expect(() => parse('1h', { maxLength: 0 })).toThrow(
        'maxLength must be a positive number'
      );
    });

    test('throws when maxLength is negative', () => {
      expect(() => parse('1h', { maxLength: -5 })).toThrow(
        'maxLength must be a positive number'
      );
    });
  });

  describe('invalid inputs', () => {
    test('empty string throws', () => {
      expect(() => parse('')).toThrow('Value must be a non-empty string');
    });

    test('non-string types throw', () => {
      expect(() => parse(null as unknown as string)).toThrow(
        'Value must be a non-empty string'
      );
      expect(() => parse(undefined as unknown as string)).toThrow(
        'Value must be a non-empty string'
      );
    });

    test('unrecognized format throws', () => {
      expect(() => parse('invalid')).toThrow('Invalid time format');
      expect(() => parse('1x')).toThrow('Invalid time format');
      expect(() => parse('abc123')).toThrow('Invalid time format');
    });
  });
});
