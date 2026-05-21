import { parse } from './parse';
import { format } from './format';
import type { StringValue, FormatOptions, ParseOptions } from './types';

/**
 * Main function that can either parse a string or format a number.
 *
 * @param value - String to parse or number to format
 * @param options - Options for parsing or formatting
 * @returns Parsed milliseconds or formatted string
 *
 * @example
 * ```ts
 * ms("2h");                    // 7200000
 * ms(7200000);                 // "2h"
 * ms(7200000, { long: true }); // "2 hours"
 * ```
 */
function ms(value: StringValue): number;
function ms(value: number, options?: FormatOptions): string;
function ms(
  value: StringValue | number,
  options?: FormatOptions | ParseOptions
): string | number {
  if (typeof value === 'string') {
    return parse(value, options as ParseOptions);
  }

  if (typeof value === 'number') {
    return format(value, options as FormatOptions);
  }

  throw new Error('Value must be a string or number');
}

export default ms;
