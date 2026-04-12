# Bun Logger

A simple Logger for Bun utilizing native functions with complex formatting capabilities.

## Features

- Supports multiple log levels (info, warn, error, debug).
- Customizable log formats.
- Color-coded output for better readability.
- Scope-based logging for better context.

## Installation

You can install the Bun Logger using bun package manager:

```bash
bun add bun-logger
```

## Usage

You can create your own Logger instance

```typescript
import { Logger } from 'bun-logger';

const logger = new Logger('aRandomScope');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
```

Or use the default logger:

```typescript
import { logger } from 'bun-logger';
logger.info('This is an info message');
```

## Environment Variables

### Log level

You can set global log level using `LOG_LEVEL` environment variable. The available log levels are:

- `none` - No logs will be output.
- `errors` - Only error messages will be output. (alias: `error`)
- `warnings` - Only warning and error messages will be output. (aliases: `warn`, `warning`)
- `info` - All messages will be output. (default, alias: `default`, `normal`)
- `verbose` - All messages will be output, including debug messages. (alias: `debug`, `all`)

#### Log only

You can also specify which log levels to output using the `LOG_ONLY` environment variable.

#### Log level settings

You can also choose to only output logs of a specific level or levels using the `LOG_$LEVEL` environment variable.

- `LOG_VERBOSE` - Only debug messages will be output.
- `LOG_INFO` - Only info messages will be output.
- `LOG_WARNINGS` - Only warning messages will be output.
- `LOG_ERRORS` - Only error messages will be output.

## Log time format

You can customize the time format of the logs using the `LOG_TIME` environment variable. The default format is none

- `none` - No time will be output.
- `iso` - ISO 8601 format (e.g., `2024-06-01T12:00:00.000Z`).
- `locale` - Locale-specific format (e.g., `6/1/2024, 12:00:00 PM`).
- `unix` - Unix timestamp in seconds (e.g., `1712131200`).
- `time` - Time only in HH:mm:ss format (e.g., `12:00:00 PM`).
