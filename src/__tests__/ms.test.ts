import ms from '../ms';

describe('ms() bidirectional function', () => {
  describe('string input → parses to milliseconds', () => {
    test('hours', () => {
      expect(ms('1h')).toBe(3_600_000);
    });

    test('minutes', () => {
      expect(ms('30m')).toBe(1_800_000);
    });

    test('days', () => {
      expect(ms('1d')).toBe(86_400_000);
    });

    test('months', () => {
      expect(ms('1mo')).toBe(2_592_000_000);
    });
  });

  describe('number input → formats to string', () => {
    test('short format (default)', () => {
      expect(ms(3_600_000)).toBe('1h');
      expect(ms(1_800_000)).toBe('30m');
      expect(ms(604_800_000)).toBe('1w');
      expect(ms(31_557_600_000)).toBe('1y');
    });

    test('long format with option', () => {
      expect(ms(3_600_000, { long: true })).toBe('1 hour');
      expect(ms(7_200_000, { long: true })).toBe('2 hours');
    });

    test('verbose format with option', () => {
      expect(ms(5_400_000, { verbose: true })).toBe('1h 30m');
    });
  });

  describe('invalid input', () => {
    test('null throws', () => {
      expect(() => ms(null as unknown as number)).toThrow(
        'Value must be a string or number'
      );
    });

    test('undefined throws', () => {
      expect(() => ms(undefined as unknown as number)).toThrow(
        'Value must be a string or number'
      );
    });
  });
});
