import { SECOND, MINUTE, HOUR, DAY, WEEK, YEAR } from './constants';
import type { FormatOptions } from './types';

/**
 * Format milliseconds to a human-readable string.
 *
 * @param ms - Milliseconds to format
 * @param options - Formatting options
 * @returns Formatted string
 * @throws {Error} When the input is not a finite number
 *
 * @example
 * ```ts
 * format(7200000);                              // "2h"
 * format(7200000, { long: true });              // "2 hours"
 * format(5400000, { verbose: true });           // "1h 30m"
 * format(5400000, { verbose: true, long: true }); // "1 hour 30 minutes"
 * ```
 */
export function format(ms: number, options: FormatOptions = {}): string {
  if (typeof ms !== 'number' || !isFinite(ms)) {
    throw new Error('Value must be a finite number');
  }

  if (options.verbose) {
    return formatVerbose(ms, options.long ?? false);
  }

  return options.long ? formatLong(ms) : formatShort(ms);
}

function formatShort(ms: number): string {
  const absMs = Math.abs(ms);

  if (absMs >= YEAR) return Math.round(ms / YEAR) + 'y';
  if (absMs >= WEEK) return Math.round(ms / WEEK) + 'w';
  if (absMs >= DAY) return Math.round(ms / DAY) + 'd';
  if (absMs >= HOUR) return Math.round(ms / HOUR) + 'h';
  if (absMs >= MINUTE) return Math.round(ms / MINUTE) + 'm';
  if (absMs >= SECOND) return Math.round(ms / SECOND) + 's';
  return ms + 'ms';
}

function formatLong(ms: number): string {
  const absMs = Math.abs(ms);

  if (absMs >= YEAR) return plural(ms, absMs, YEAR, 'year');
  if (absMs >= WEEK) return plural(ms, absMs, WEEK, 'week');
  if (absMs >= DAY) return plural(ms, absMs, DAY, 'day');
  if (absMs >= HOUR) return plural(ms, absMs, HOUR, 'hour');
  if (absMs >= MINUTE) return plural(ms, absMs, MINUTE, 'minute');
  if (absMs >= SECOND) return plural(ms, absMs, SECOND, 'second');
  return ms + ' ms';
}

/**
 * Format milliseconds showing all non-zero components decomposed by unit.
 * Handles negative values by prefixing the result with "-".
 */
function formatVerbose(ms: number, long: boolean): string {
  const negative = ms < 0;
  let remaining = Math.abs(ms);
  const parts: string[] = [];

  const units: Array<[number, string, string]> = [
    [YEAR, 'y', 'year'],
    [WEEK, 'w', 'week'],
    [DAY, 'd', 'day'],
    [HOUR, 'h', 'hour'],
    [MINUTE, 'm', 'minute'],
    [SECOND, 's', 'second'],
  ];

  for (const [unit, short, name] of units) {
    if (remaining >= unit) {
      const count = Math.floor(remaining / unit);
      remaining -= count * unit;
      parts.push(
        long
          ? `${count} ${count === 1 ? name : name + 's'}`
          : `${count}${short}`
      );
    }
  }

  if (remaining > 0 || parts.length === 0) {
    parts.push(long ? `${remaining} ms` : `${remaining}ms`);
  }

  const result = parts.join(' ');
  return negative ? `-${result}` : result;
}

function plural(ms: number, absMs: number, unit: number, name: string): string {
  const isPlural = absMs >= unit * 1.5;
  return Math.round(ms / unit) + ' ' + name + (isPlural ? 's' : '');
}
