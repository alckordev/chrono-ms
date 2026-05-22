import { parseMultiple } from '../parse';

describe('parseMultiple()', () => {
  describe('compound strings', () => {
    test('two tokens: hours and minutes', () => {
      expect(parseMultiple('1h 30m')).toBe(5_400_000);
    });

    test('three tokens: days, hours and minutes', () => {
      expect(parseMultiple('2d 4h 30m')).toBe(189_000_000);
    });

    test('four tokens: hours, minutes, seconds, ms', () => {
      expect(parseMultiple('1h 1m 1s 500ms')).toBe(3_661_500);
    });

    test('mixing weeks and days', () => {
      expect(parseMultiple('1w 3d')).toBe(864_000_000);
    });

    test('mixing months and days', () => {
      expect(parseMultiple('1mo 15d')).toBe(3_888_000_000);
    });
  });

  describe('single token behaves like parse()', () => {
    test('single hour token', () => {
      expect(parseMultiple('1h')).toBe(3_600_000);
    });

    test('single bare number', () => {
      expect(parseMultiple('100')).toBe(100);
    });
  });

  describe('options forwarding', () => {
    test('maxLength option is forwarded to each token', () => {
      expect(() => parseMultiple('1h 30m', { maxLength: 1 })).toThrow(
        'String too long'
      );
    });
  });

  describe('error cases', () => {
    test('throws for invalid token in compound string', () => {
      expect(() => parseMultiple('1h invalid')).toThrow('Invalid time format');
    });

    test('throws for empty string', () => {
      expect(() => parseMultiple('')).toThrow(
        'Value must be a non-empty string'
      );
    });

    test('throws for whitespace-only string', () => {
      expect(() => parseMultiple('   ')).toThrow(
        'Value must be a non-empty string'
      );
    });

    test('throws for non-string input', () => {
      expect(() => parseMultiple(null as unknown as string)).toThrow(
        'Value must be a non-empty string'
      );
    });
  });
});
