# @iscodex/ms-parser

A lightweight, TypeScript-first library for parsing and formatting time durations with human-readable strings.

[![NPM version](https://img.shields.io/npm/v/@iscodex/ms-parser?color=32A9C3&labelColor=1B3C4A&label=npm&logo=npm)](https://www.npmjs.com/package/@iscodex/ms-parser)
[![NPM downloads](https://img.shields.io/npm/dm/@iscodex/ms-parser?color=32A9C3&labelColor=1B3C4A&label=downloads&logo=npm)](https://www.npmjs.com/package/@iscodex/ms-parser)
[![NPM License](https://img.shields.io/npm/l/@iscodex/ms-parser?color=32A9C3&labelColor=1B3C4A&label=license&logo=github)](https://www.npmjs.com/package/@iscodex/ms-parser)
[![Build Status](https://img.shields.io/github/actions/workflow/status/iscodex/ms-parser/ci.yml?color=32A9C3&labelColor=1B3C4A&label=CI&logo=github)](https://github.com/iscodex/ms-parser/actions)

## Features

- 🚀 **Lightweight**: Zero dependencies
- 📝 **TypeScript-first**: Full type safety and IntelliSense support
- 🔄 **Bidirectional**: Parse strings to milliseconds and format milliseconds to strings
- 🎯 **Precise**: Handles decimal values and negative numbers
- 📚 **Comprehensive**: Supports all common time units
- 🧪 **Well-tested**: >95% test coverage

## Installation

```bash
npm install @iscodex/ms-parser
```

```bash
yarn add @iscodex/ms-parser
```

```bash
pnpm add @iscodex/ms-parser
```

## Usage

### Basic Usage

```typescript
import ms from '@iscodex/ms-parser';

// Parse string to milliseconds
ms('2 hours'); // 7200000
ms('1d'); // 86400000
ms('10h'); // 36000000
ms('2.5 hrs'); // 9000000
ms('1y'); // 31557600000

// Format milliseconds to string
ms(60000); // "1m"
ms(2 * 60 * 1000); // "2m"
ms(ms('10 hours')); // "10h"
ms(60000, { long: true }); // "1 minute"
ms(2 * 60 * 1000, { long: true }); // "2 minutes"
```

### Individual Functions

```typescript
import { parse, format } from '@iscodex/ms-parser';

// Parse only
const milliseconds = parse('1.5h'); // 5400000

// Format only
const shortFormat = format(3600000); // "1h"
const longFormat = format(3600000, { long: true }); // "1 hour"
```

### Compound Strings with `parseMultiple`

```typescript
import { parseMultiple } from '@iscodex/ms-parser';

parseMultiple('1h 30m');    // 5400000
parseMultiple('2d 4h 30m'); // 189000000
parseMultiple('1w 3d');     // 864000000
```

### Safe Parsing with `tryParse`

```typescript
import { tryParse } from '@iscodex/ms-parser';

// Returns null instead of throwing on invalid input
tryParse('2h');      // 7200000
tryParse('invalid'); // null
tryParse('');        // null
```

### Verbose Format

```typescript
import { format } from '@iscodex/ms-parser';

format(5400000, { verbose: true });              // "1h 30m"
format(5400000, { verbose: true, long: true });  // "1 hour 30 minutes"
format(3661000, { verbose: true });              // "1h 1m 1s"
format(90000,   { verbose: true });              // "1m 30s"
```

### Advanced Usage

```typescript
import ms, {
  parse,
  format,
  type FormatOptions,
  type ParseOptions,
} from '@iscodex/ms-parser';

// Custom parsing options
const result = parse('30m', { maxLength: 50 });

// Custom formatting options
const formatted = format(7200000, { long: true });

// Type-safe string values
type TimeString = `${number}h` | `${number}m` | `${number}s`;
const timeValue: TimeString = '2h';
const parsed = ms(timeValue); // 7200000
```

## Supported Units

| Unit         | Long Format                                    | Short Format |
| ------------ | ---------------------------------------------- | ------------ |
| Years        | `years`, `year`, `yrs`, `yr`                   | `y`          |
| Weeks        | `weeks`, `week`                                | `w`          |
| Months       | `months`, `month`                              | `mo`         |
| Days         | `days`, `day`                                  | `d`          |
| Hours        | `hours`, `hour`, `hrs`, `hr`                   | `h`          |
| Minutes      | `minutes`, `minute`, `mins`, `min`             | `m`          |
| Seconds      | `seconds`, `second`, `secs`, `sec`             | `s`          |
| Milliseconds | `milliseconds`, `millisecond`, `msecs`, `msec` | `ms`         |

> **Note:** `mo` is used for months to avoid ambiguity with `m` (minutes). Month is defined as exactly 30 days.

All units are case-insensitive and support both singular and plural forms.

## API Reference

### `ms(value, options?)`

Main function that can parse strings or format numbers.

**Parameters:**

- `value: string | number` - String to parse or number to format
- `options?: FormatOptions | ParseOptions` - Configuration options

**Returns:**

- `number` when parsing strings
- `string` when formatting numbers

### `parse(value, options?)`

Parse a time string into milliseconds.

**Parameters:**

- `value: string` - Time string to parse
- `options?: ParseOptions` - Parsing configuration

**Returns:** `number` - Parsed time in milliseconds

**Options:**

- `maxLength?: number` - Maximum string length, must be a positive number (default: 100)

### `tryParse(value, options?)`

Parse a time string and return `null` instead of throwing on invalid input.

**Parameters:**

- `value: string` - Time string to parse
- `options?: ParseOptions` - Parsing configuration

**Returns:** `number | null` - Parsed milliseconds, or `null` on failure

### `parseMultiple(value, options?)`

Parse a compound time string with multiple space-separated tokens.

**Parameters:**

- `value: string` - Compound time string (e.g., `"1h 30m"`, `"2d 4h 30m"`)
- `options?: ParseOptions` - Parsing configuration applied to each token

**Returns:** `number` - Total duration in milliseconds

### `format(ms, options?)`

Format milliseconds into a human-readable string.

**Parameters:**

- `ms: number` - Milliseconds to format
- `options?: FormatOptions` - Formatting configuration

**Returns:** `string` - Formatted time string

**Options:**

- `long?: boolean` - Use long format (default: false)
- `verbose?: boolean` - Show all non-zero components decomposed (default: false)

## Examples

### Basic Parsing

```typescript
ms('1s'); // 1000
ms('1m'); // 60000
ms('1h'); // 3600000
ms('1d'); // 86400000
ms('1w'); // 604800000
ms('1y'); // 31557600000
```

### Decimal Values

```typescript
ms('1.5h'); // 5400000
ms('0.5d'); // 43200000
ms('2.5 hours'); // 9000000
```

### Negative Values

```typescript
ms('-1h'); // -3600000
ms('-30m'); // -1800000
```

### Different Formats

```typescript
// Short format (default)
ms(60000); // "1m"
ms(3600000); // "1h"
ms(604800000); // "1w"
ms(31557600000); // "1y"

// Long format
ms(60000, { long: true }); // "1 minute"
ms(120000, { long: true }); // "2 minutes"
ms(3600000, { long: true }); // "1 hour"
ms(7200000, { long: true }); // "2 hours"

// Verbose format (decomposed)
format(5400000, { verbose: true }); // "1h 30m"
format(5400000, { verbose: true, long: true }); // "1 hour 30 minutes"
```

### Months

```typescript
parse('1mo');      // 2592000000  (30 days)
parse('6 months'); // 15552000000
```

## Error Handling

The library throws descriptive errors for invalid inputs:

```typescript
try {
  ms('invalid');
} catch (error) {
  console.log(error.message); // "Invalid time format: "invalid""
}

try {
  ms('a'.repeat(101));
} catch (error) {
  console.log(error.message); // "String too long. Maximum length is 100 characters"
}

try {
  format(NaN);
} catch (error) {
  console.log(error.message); // "Value must be a finite number"
}
```

## Limitations

- Maximum string length is 100 characters by default (configurable via `maxLength`)
- Uses approximate year length (365.25 days)
- Month is defined as exactly 30 days (not calendar-aware)
- `format()` does not output months; use `parse('1mo')` for input only

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Build the package
pnpm run build

# Lint the code
pnpm run lint

# Type check
pnpm run type-check
```

## Requirements

- Node.js >= 20.0.0
- Supports ES Modules

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Francisco Luis Rios Vega](https://github.com/alckordev)
