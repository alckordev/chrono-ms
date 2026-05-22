import { SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } from '../constants';

describe('time constants', () => {
  test('SECOND equals 1000ms', () => {
    expect(SECOND).toBe(1000);
  });

  test('MINUTE equals 60 seconds', () => {
    expect(MINUTE).toBe(60_000);
  });

  test('HOUR equals 60 minutes', () => {
    expect(HOUR).toBe(3_600_000);
  });

  test('DAY equals 24 hours', () => {
    expect(DAY).toBe(86_400_000);
  });

  test('WEEK equals 7 days', () => {
    expect(WEEK).toBe(604_800_000);
  });

  test('MONTH equals 30 days', () => {
    expect(MONTH).toBe(2_592_000_000);
  });

  test('YEAR equals 365.25 days', () => {
    expect(YEAR).toBe(31_557_600_000);
  });

  test('constants maintain correct relative values', () => {
    expect(MINUTE).toBe(SECOND * 60);
    expect(HOUR).toBe(MINUTE * 60);
    expect(DAY).toBe(HOUR * 24);
    expect(WEEK).toBe(DAY * 7);
    expect(MONTH).toBe(DAY * 30);
    expect(YEAR).toBe(DAY * 365.25);
  });
});
