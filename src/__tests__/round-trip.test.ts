import { parse } from '../parse';
import { format } from '../format';

/**
 * Round-trip tests verify that parse(format(x)) === x for exact unit values.
 * Only exact multiples of units are used since format() applies Math.round().
 */
describe('round-trip: parse(format(x)) === x', () => {
  const exactCases: Array<[number, string]> = [
    [1_000, '1s'],
    [60_000, '1m'],
    [3_600_000, '1h'],
    [86_400_000, '1d'],
    [604_800_000, '1w'],
    [31_557_600_000, '1y'],
  ];

  test.each(exactCases)(
    'parse(format(%i)) === %i (formatted as "%s")',
    (ms) => {
      const formatted = format(ms);
      expect(parse(formatted)).toBe(ms);
    }
  );

  test('round-trip for negative exact values', () => {
    expect(parse(format(-3_600_000))).toBe(-3_600_000);
    expect(parse(format(-86_400_000))).toBe(-86_400_000);
  });

  test('round-trip in long format', () => {
    expect(parse(format(3_600_000, { long: true }))).toBe(3_600_000);
    expect(parse(format(86_400_000, { long: true }))).toBe(86_400_000);
  });

  test('zero is stable across round-trip', () => {
    expect(parse(format(0))).toBe(0);
  });
});
