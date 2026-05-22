import { SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } from './constants';
import type { ParseOptions } from './types';

/**
 * Parse a time string and return milliseconds.
 *
 * @param value - Time string to parse (e.g., "2h", "30 minutes", "1d", "1mo")
 * @param options - Parsing options
 * @returns Parsed time in milliseconds
 * @throws {Error} When the string format is invalid
 *
 * @example
 * ```ts
 * parse("2h");        // 7200000
 * parse("30 minutes"); // 1800000
 * parse("1d");        // 86400000
 * parse("1mo");       // 2592000000
 * ```
 */
export function parse(value: string, options: ParseOptions = {}): number {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('Value must be a non-empty string');
  }

  const { maxLength } = options;
  if (maxLength !== undefined && maxLength <= 0) {
    throw new Error('maxLength must be a positive number');
  }

  const resolvedMaxLength = maxLength ?? 100;
  if (value.length > resolvedMaxLength) {
    throw new Error(
      `String too long. Maximum length is ${resolvedMaxLength} characters`
    );
  }

  // months?|mo must appear before minutes?|mins?|m to avoid partial match ambiguity
  const match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|months?|mo|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      value.trim()
    );

  if (!match) {
    throw new Error(`Invalid time format: "${value}"`);
  }

  const num = parseFloat(match[1]);
  /* istanbul ignore next */
  if (!isFinite(num)) {
    throw new Error(`Invalid number: "${match[1]}"`);
  }

  const unit = (match[2] || 'ms').toLowerCase();

  switch (unit) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return num * YEAR;
    case 'weeks':
    case 'week':
    case 'w':
      return num * WEEK;
    case 'months':
    case 'month':
    case 'mo':
      return num * MONTH;
    case 'days':
    case 'day':
    case 'd':
      return num * DAY;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return num * HOUR;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return num * MINUTE;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return num * SECOND;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return num;
    /* istanbul ignore next */
    default:
      throw new Error(`Unknown unit: "${unit}"`);
  }
}

/**
 * Parse a time string and return milliseconds, or `null` if the input is invalid.
 * Useful when input is untrusted and exception handling would be verbose.
 *
 * @param value - Time string to parse
 * @param options - Parsing options
 * @returns Parsed time in milliseconds, or `null` on failure
 *
 * @example
 * ```ts
 * tryParse("2h");      // 7200000
 * tryParse("invalid"); // null
 * ```
 */
export function tryParse(value: string, options?: ParseOptions): number | null {
  try {
    return parse(value, options);
  } catch {
    return null;
  }
}

/**
 * Parse a compound time string with multiple space-separated tokens.
 *
 * @param value - Compound time string (e.g., "1h 30m", "2d 4h 30m")
 * @param options - Parsing options applied to each token
 * @returns Total duration in milliseconds
 * @throws {Error} When any token has an invalid format
 *
 * @example
 * ```ts
 * parseMultiple("1h 30m");    // 5400000
 * parseMultiple("2d 4h 30m"); // 189000000
 * ```
 */
export function parseMultiple(value: string, options?: ParseOptions): number {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('Value must be a non-empty string');
  }

  return value
    .trim()
    .split(/\s+/)
    .reduce((acc, token) => acc + parse(token, options), 0);
}
