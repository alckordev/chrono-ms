/**
 * Time units supported by the parser
 */
export type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Months'
  | 'Month'
  | 'Mo'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

export type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

/**
 * Configuration options for formatting
 */
export interface FormatOptions {
  /**
   * Use long format (e.g., "1 day" instead of "1d")
   * @default false
   */
  long?: boolean;
  /**
   * Use verbose format, showing all non-zero components (e.g., "1h 30m" instead of "2h")
   * @default false
   */
  verbose?: boolean;
}

/**
 * Configuration options for parsing
 */
export interface ParseOptions {
  /**
   * Maximum string length to parse. Must be a positive number.
   * @default 100
   */
  maxLength?: number;
}
