/**
 * Defines the `LogLevel` type, which represents the different levels of logging (`verbose`, `info`, `warnings`, `errors`) that can be enabled or disabled in the {@link Logger} class.
 *
 * Each property is a boolean indicating whether that log level is active or not.
 *
 * @internal
 */
export type LogLevel = {
  /**
   * Whether `verbose` log messages should be included
   *
   * Log level: `verbose`:
   * - {@link Logger.debug}
   * - {@link Logger.trace}
   *
   * Aliases:
   * - `all`
   * - `debug`
   */
  verbose: boolean;
  /**
   * Whether `info` log messages should be included
   *
   * Log level: `info`:
   * - {@link Logger.count}
   * - {@link Logger.countReset}
   * - {@link Logger.dir}
   * - {@link Logger.dirxml}
   * - {@link Logger.group}
   * - {@link Logger.groupCollapsed}
   * - {@link Logger.groupEnd}
   * - {@link Logger.info}
   * - {@link Logger.log}
   * - {@link Logger.profile}
   * - {@link Logger.profileEnd}
   * - {@link Logger.table}
   * - {@link Logger.time}
   * - {@link Logger.timeEnd}
   * - {@link Logger.timeLog}
   */
  info: boolean;
  /**
   * Whether `warnings` log messages should be included
   *
   * Log level: `warnings`:
   * - {@link Logger.warn}
   *
   * Aliases:
   * - `warn`
   * - `warning`
   */
  warnings: boolean;
  /**
   * Whether `errors` log messages should be included
   *
   * Log level: `errors`:
   * - {@link Logger.assert}
   * - {@link Logger.error}
   *
   * Aliases:
   * - `error`
   */
  errors: boolean;
};

/**
 * ANSI escape codes for coloring console output.
 *
 * @enum
 * @internal
 */
export const ANSI_COLORS = {
  /**
   * Reset ANSI code
   */
  reset: '\x1b[0m',
  /**
   * Black foreground color ANSI code
   */
  black: '\x1b[30m',
  /**
   * Red foreground color ANSI code
   */
  red: '\x1b[31m',
  /**
   * Green foreground color ANSI code
   */
  green: '\x1b[32m',
  /**
   * Yellow foreground color ANSI code
   */
  yellow: '\x1b[33m',
  /**
   * Blue foreground color ANSI code
   */
  blue: '\x1b[34m',
  /**
   * Magenta foreground color ANSI code
   */
  magenta: '\x1b[35m',
  /**
   * Cyan foreground color ANSI code
   */
  cyan: '\x1b[36m',
  /**
   * White foreground color ANSI code
   */
  white: '\x1b[37m',
  /**
   * Intense black foreground color ANSI code
   */
  intenseBlack: '\x1b[90m',
  /**
   * Intense red foreground color ANSI code
   */
  intenseRed: '\x1b[91m',
  /**
   * Intense green foreground color ANSI code
   */
  intenseGreen: '\x1b[92m',
  /**
   * Intense yellow foreground color ANSI code
   */
  intenseYellow: '\x1b[93m',
  /**
   * Intense blue foreground color ANSI code
   */
  intenseBlue: '\x1b[94m',
  /**
   * Intense magenta foreground color ANSI code
   */
  intenseMagenta: '\x1b[95m',
  /**
   * Intense cyan foreground color ANSI code
   */
  intenseCyan: '\x1b[96m',
  /**
   * Intense white foreground color ANSI code
   */
  intenseWhite: '\x1b[97m',
};

/**
 * Defines the possible string values for log levels that can be used to configure the log level of the {@link Logger} class through environment variables or directly as a parameter.
 *
 * @see {@link getLogLevel} for details on how log levels are determined and configured.
 */
export type LogLevelString = 'none' | 'all' | 'verbose' | 'debug' | 'info' | 'warn' | 'warning' | 'warnings' | 'error' | 'errors' | 'default' | 'normal';

/**
 * Determines the log level based on the provided input or environment variables.
 *
 * `env.LOG_LEVEL` can be set to one of the following values (case-insensitive):
 * - `none`: Disables all logging.
 * - `all`, `verbose`, `debug`: Enables all log levels (verbose, info, warnings, errors).
 * - `info`, `default`, `normal`: Enables info, warnings, and errors, but disables verbose logging. (This is the default log level if no environment variable is set.)
 * - `warn`, `warning`, `warnings`: Enables warnings and errors, but disables verbose and info logging.
 * - `error`, `errors`: Enables only error logging, disabling verbose, info, and warnings.
 *
 * The `env.LOG_ONLY` variable can be used to enable only a specific log level (case-insensitive):
 * - `verbose` or `debug`: Enables only verbose logging.
 * - `info`: Enables only info logging.
 * - `warn`, `warning`, or `warnings`: Enables only warnings logging.
 * - `error` or `errors`: Enables only error logging.
 *
 * Additionally, individual log levels can be overridden using the following environment variables:
 * - `env.LOG_VERBOSE`: Set to `true` to enable verbose logging or `false` to disable it.
 * - `env.LOG_INFO`: Set to `true` to enable info logging or `false` to disable it.
 * - `env.LOG_WARNINGS`: Set to `true` to enable warnings logging or `false` to disable it.
 * - `env.LOG_ERRORS`: Set to `true` to enable error logging or `false` to disable it.
 *
 * @remarks
 * If `logLevel` parameter is provided, it will override the corresponding log levels determined by the environment variables while keeping the others at their default or previously set values.
 *
 * @see {@link Logger} for details on how the log levels are used in the Logger class.
 * @see {@link LogLevel} for details on the structure of the LogLevel type.
 *
 * @param logLevel either string representing wanted log level or {@link LogLevel} object
 * @returns The log level for Logger
 *
 * @internal
 */
export function getLogLevel(logLevel?: Partial<LogLevel> | LogLevelString): LogLevel {
  const level: Partial<LogLevel> = {};

  switch (typeof logLevel === 'string' ? logLevel : Bun.env['LOG_LEVEL']?.toLowerCase()) {
    case 'none':
      level.verbose = false;
      level.info = false;
      level.warnings = false;
      level.errors = false;
      break;
    case 'all':
    case 'verbose':
    case 'debug':
      level.verbose = true;
      level.info = true;
      level.warnings = true;
      level.errors = true;
      break;
    default:
    case 'default':
    case 'normal':
    case 'info':
      level.verbose = false;
      level.info = true;
      level.warnings = true;
      level.errors = true;
      break;
    case 'warn':
    case 'warning':
    case 'warnings':
      level.verbose = false;
      level.info = false;
      level.warnings = true;
      level.errors = true;
      break;
    case 'error':
    case 'errors':
      level.verbose = false;
      level.info = false;
      level.warnings = false;
      level.errors = true;
  }

  if (typeof logLevel !== 'string')
    switch (Bun.env['LOG_ONLY']?.toLowerCase()) {
      case 'verbose':
      case 'debug':
        level.verbose = true;
        level.info = false;
        level.warnings = false;
        level.errors = false;
        break;
      case 'info':
        level.verbose = false;
        level.info = true;
        level.warnings = false;
        level.errors = false;
        break;
      case 'warn':
      case 'warning':
      case 'warnings':
        level.verbose = false;
        level.info = false;
        level.warnings = true;
        level.errors = false;
        break;
      case 'error':
      case 'errors':
        level.verbose = false;
        level.info = false;
        level.warnings = false;
        level.errors = true;
        break;
    }

  if (typeof logLevel !== 'string') {
    if (Bun.env['LOG_VERBOSE'] === 'true') level.verbose = true;
    else if (Bun.env['LOG_VERBOSE'] === 'false') level.verbose = false;

    if (Bun.env['LOG_INFO'] === 'true') level.info = true;
    else if (Bun.env['LOG_INFO'] === 'false') level.info = false;

    if (Bun.env['LOG_WARNINGS'] === 'true') level.warnings = true;
    else if (Bun.env['LOG_WARNINGS'] === 'false') level.warnings = false;

    if (Bun.env['LOG_ERRORS'] === 'true') level.errors = true;
    else if (Bun.env['LOG_ERRORS'] === 'false') level.errors = false;
  }

  if (logLevel && typeof logLevel === 'object') {
    level.verbose = logLevel.verbose ?? level.verbose ?? false;
    level.info = logLevel.info ?? level.info ?? false;
    level.warnings = logLevel.warnings ?? level.warnings ?? false;
    level.errors = logLevel.errors ?? level.errors ?? false;
  }

  return level as LogLevel;
}

/**
 * Defines the possible string values for log time formats that can be used to configure the timestamp format of log messages in the {@link Logger} class through environment variables or directly as a parameter.
 *
 * @see {@link getLogTime} for details on how log time formats are determined and configured.
 */
export type LogTimeString = 'none' | 'iso' | 'locale' | 'unix' | 'time';

/**
 * Formats the current time for log messages
 *
 * The `logTime` parameter or `LOG_TIME` environment variable can be set to one of the following values (case-insensitive):
 * - `none` - No timestamp will be included in the logs.
 * - `iso` - The timestamp will be in ISO 8601 format (e.g. `2024-06-01T12:00:00.000Z`).
 * - `locale` - The timestamp will be in the local date and time format (e.g. `6/1/2024, 12:00:00 PM`).
 * - `unix` - The timestamp will be in Unix time format (i.e. seconds since January 1, 1970).
 * - `time` - The timestamp will include only the local time (e.g. `12:00:00 PM`).
 *
 * @remarks
 * The format included `ANSI` escape codes to color the timestamp in intense black, and it resets the color after the timestamp. If `none` is selected, it simply resets the color without adding any timestamp.
 *
 * @param logTime - Optional parameter to specify the time format. If not provided, it will use the `LOG_TIME` environment variable or default to `none`.
 *
 * @returns the time formatted for Logs
 *
 * @internal
 */
export function getLogTime(logTime?: LogTimeString): string {
  switch (logTime?.toLowerCase() || Bun.env['LOG_TIME']?.toLowerCase()) {
    default:
    case 'none':
      return `${ANSI_COLORS.reset}`;
    case 'iso':
      return `${ANSI_COLORS.intenseBlack}[${new Date().toISOString()}] ${ANSI_COLORS.reset}`;
    case 'locale':
      return `${ANSI_COLORS.intenseBlack}[${new Date().toLocaleString()}] ${ANSI_COLORS.reset}`;
    case 'unix':
      return `${ANSI_COLORS.intenseBlack}[${Math.floor(Date.now() / 1000)}] ${ANSI_COLORS.reset}`;
    case 'time':
      return `${ANSI_COLORS.intenseBlack}[${new Date().toLocaleTimeString()}] ${ANSI_COLORS.reset}`;
  }
}

/**
 * Global array to track the current group level for proper indentation and formatting of log messages
 *
 * @internal
 */
const groupLevel: Array<'g' | 'c'> = [];

/**
 * A custom Logger class that provides enhanced logging capabilities with log levels, scoping, and formatting.
 *
 * It wraps around the native console methods and adds features like colored output, timestamps, and grouping.
 * The log level can be configured globally or per instance, allowing for flexible logging based on the environment or specific needs.
 *
 * @see {@link getLogLevel} for details on how log levels are determined and configured.
 *
 * Example usage:
 * ```typescript
 * const logger = new Logger('MyApp', 'info');
 * logger.debug('This is a debug message'); // Will not be logged due to log level
 * logger.info('This is an info message'); // Will be logged with timestamp and scope
 * logger.warn('This is a warning'); // Will be logged with timestamp and scope
 * logger.error('This is an error'); // Will be logged with timestamp and scope
 * ```
 *
 * @public
 */
export class Logger {
  /**
   * Current log level
   *
   * @see {@link Logger.setLogLevel} for details on how log levels are determined and configured.
   *
   * @internal
   * @private
   */
  private LOG_LEVEL: LogLevel;
  /**
   * Map to track active profiles for profiling methods
   *
   * @internal
   * @private
   */
  private activeProfiles: Map<string, number> = new Map();
  /**
   * Scope for this Logger instance, which will be prefixed to all log messages
   *
   * @see {@link Logger.setScope} for details on how scope is determined and configured.
   * @see {@link Logger.getScope} for details on how to retrieve the current scope.
   *
   * @internal
   */
  private scope: string;

  /**
   * Sets the log level for this Logger instance
   *
   * @see {@link getLogLevel} for details on how log levels are determined and configured.
   *
   * @param logLevel The log level to set
   */
  public setLogLevel(logLevel: Partial<LogLevel> | LogLevelString): void {
    this.LOG_LEVEL = getLogLevel(logLevel);
  }

  /**
   * Sets the scope for this Logger instance, which will be prefixed to all log messages.
   *
   * If an empty string is provided, no scope will be used.
   *
   * @param scope Scope name
   */
  public setScope(scope: string): void {
    this.scope = scope ? `${scope}: ` : '';
  }

  /**
   * Gets the current scope for this Logger instance.
   *
   * @returns Scope name
   */
  public getScope(): string {
    return this.scope;
  }

  /**
   * Create a new default logger instance with default log level
   */
  public constructor();
  /**
   * Creates a new logger instance with the specified scope.
   *
   * The scope is a string that will be prefixed to all log messages from this Logger instance, allowing for easier identification of the source of log messages
   * The scope can also be set or changed later using the {@link Logger.setScope} method.
   *
   * @remarks
   * This constructor cannot be used to name the scope with the same name as a log level (e.g. `info`, `warn`, `error`) to avoid confusion with log level configuration.
   * If such a name is used, it will be treated as a log level configuration instead of a scope, and the scope will default to an empty string.
   *
   * @see {@link Logger.setScope} for details on how scope is determined and configured.
   *
   * @param scope Sets the scope for this Logger instance, which will be prefixed to all log messages. If an empty string is provided, no scope will be used.
   */
  public constructor(scope: Exclude<string, LogLevelString>);
  /**
   * Creates a new logger instance with the specified log level.
   *
   * If a `string` is provided, it will be processed according to the rules defined in the {@link getLogLevel} function
   * If a `Partial<LogLevel>` object is provided, it will override the corresponding log levels while keeping the others at their default values.
   *
   * @see {@link getLogLevel} for details on how log levels are determined and configured.
   * @param logLevel the log level to set for this Logger instance. This can be a string representing the desired log level or a Partial<LogLevel> object to specify individual log levels. If a string is provided, it will be processed according to the rules defined in the `getLogLevel` function, which also considers environment variables for configuration. If a Partial<LogLevel> object is provided, it will override the corresponding log levels while keeping the others at their default or previously set values.
   */
  public constructor(logLevel: Partial<LogLevel> | LogLevelString);
  /**
   * Create a new logger instance with the specified scope and log level.
   *
   * The scope is a string that will be prefixed to all log messages from this Logger instance, allowing for easier identification of the source of log messages.
   * The scope can also be set or changed later using the {@link Logger.setScope} method.
   *
   * If a `string` is provided, it will be processed according to the rules defined in the {@link getLogLevel} function
   * If a `Partial<LogLevel>` object is provided, it will override the corresponding log levels while keeping the others at their default values.
   *
   * @see {@link Logger.setScope} for details on how scope is determined and configured.
   *
   * @param scope Scope name
   * @param logLevel The logLevel for this `Logger` instance
   */
  public constructor(scope: string, logLevel: Partial<LogLevel> | LogLevelString);
  public constructor(...args: unknown[]) {
    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        if (
          args[0].toLowerCase() === 'none'
          || args[0].toLowerCase() === 'all'
          || args[0].toLowerCase() === 'verbose'
          || args[0].toLowerCase() === 'debug'
          || args[0].toLowerCase() === 'info'
          || args[0].toLowerCase() === 'warn'
          || args[0].toLowerCase() === 'warning'
          || args[0].toLowerCase() === 'warnings'
          || args[0].toLowerCase() === 'error'
          || args[0].toLowerCase() === 'errors'
        ) {
          this.scope = '';
          this.LOG_LEVEL = getLogLevel(args[0] as LogLevelString);
        } else {
          this.scope = `${args[0]}: `;
          this.LOG_LEVEL = getLogLevel(undefined);
        }
        this.scope = args[0] ? `${args[0]}: ` : '';
        this.LOG_LEVEL = getLogLevel(undefined);
      } else {
        this.scope = '';
        this.LOG_LEVEL = getLogLevel(args[0] as Partial<LogLevel>);
      }
    } else {
      this.scope = args[0] ? `${args[0]}: ` : '';
      this.LOG_LEVEL = getLogLevel(args[1] as Partial<LogLevel> | LogLevelString);
    }
  }

  /**
   * Assert the condition and log the data if assertion fails.
   *
   * If condition is `true` no message will be logged
   *
   * Log level: `errors`
   *
   * @param condition The condition to assert
   * @param data The data to print if assertion fails
   */
  assert(condition: boolean, ...data: unknown[]): void {
    if (!this.LOG_LEVEL.errors) return;
    if (!condition) console.write(this.scope, getLogTime());
    console.assert(condition, `${ANSI_COLORS.intenseRed}✘${ANSI_COLORS.red}`, ...data, ANSI_COLORS.reset);
  }

  /**
   * Clears the console
   *
   * @remarks
   * This method will clear all logs regardless of the log level and scope
   */
  clear(): void {
    console.clear();
  }

  /**
   * Increments the counter for the given label and logs it to the console.
   *
   * Log level: `info`
   *
   * @remarks
   * The counter will not increment if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   * If the counter for the given label does not exist, it will be initialized to 0 before being incremented.
   * The log message will always automatically include the scope of the logger
   *
   * @param label The label for counter, default is `default`
   */
  count(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(this.scope, getLogTime());
    console.count(`${ANSI_COLORS.intenseGreen}#${ANSI_COLORS.green} ${this.scope}${label}`);
  }

  /**
   * Resets the counter for the given label.
   *
   * Log level: `info`
   *
   * @remarks
   * The counter will not reset if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   * If the counter for the given label does not exist, this method will have no effect.
   * The counter log will always automatically include the scope of the logger
   *
   * @param label The label for the counter, default is `default`
   */
  countReset(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.countReset(`${ANSI_COLORS.intenseGreen}#${ANSI_COLORS.green} ${this.scope}${label}`);
  }

  /**
   * This will print a given object using `console.dir`
   *
   * Prints JSON data of an object
   *
   * Log level: `info`
   *
   * @param item The object to print
   * @param options Options to pass to `console.dir`
   */
  dir(item: unknown, options?: { colors?: boolean; depth?: boolean; showHidden?: boolean }): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(this.scope, getLogTime(), '\n');
    console.dir(item, options);
  }

  /**
   * This will print a given object using `console.dirxml`
   *
   * Print XML data of an object
   *
   * Log level: `info`
   *
   * @param data The object to print
   */
  dirxml(...data: unknown[]): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime(), '\n');
    console.dirxml(...data);
  }

  /**
   * Print a debug message
   *
   * Log level: `verbose`
   *
   * @param data The data to print
   */
  debug(...data: unknown[]): void {
    if (!this.LOG_LEVEL.verbose) return;
    console.write(getLogTime());
    console.debug(`${ANSI_COLORS.intenseCyan}⋯${ANSI_COLORS.cyan}`, ...data, ANSI_COLORS.reset);
  }

  /**
   * Print an error message
   *
   * Log level: `errors`
   *
   * @param data The data to print
   */
  error(...data: unknown[]) {
    if (!this.LOG_LEVEL.errors) return;
    console.write(getLogTime());
    console.error(`${ANSI_COLORS.intenseRed}✖${ANSI_COLORS.red}`, ...data, ANSI_COLORS.reset);
  }

  /**
   * Start a new group
   *
   * Log level: `info`
   *
   * @remarks
   * This will create a group regardless of the log level, but the group label will only be printed if log level includes info.
   * The group is not ended automatically, so you need to call `groupEnd` to end the group.
   * The groups are tracked regardless of the scope
   *
   * @param label The group label
   */
  group(label?: string) {
    groupLevel.push('g');
    if (this.LOG_LEVEL.info) {
      console.write(getLogTime());
      console.group(`${ANSI_COLORS.intenseYellow}▾${ANSI_COLORS.yellow} ${label}${ANSI_COLORS.reset}`);
    } else {
      console.group();
    }
  }

  /**
   * Start a new collapsed group
   *
   * Collapsed groups don't include indentation for their content
   *
   * Log level: `info`
   *
   * @remarks
   * This will create a collapsed group regardless of the log level, but the group label will only be printed if log level includes `info`.
   * The group is not ended automatically, so you need to call `groupEnd` to end the group.
   * The groups are tracked regardless of the scope
   *
   * @param label The group label
   */
  groupCollapsed(label?: string) {
    groupLevel.push('c');
    if (this.LOG_LEVEL.info) {
      console.write(getLogTime());
      console.groupCollapsed(`${ANSI_COLORS.intenseYellow}▸${ANSI_COLORS.yellow} ${label}${ANSI_COLORS.reset}`);
    } else {
      console.groupCollapsed();
    }
  }

  /**
   * End the current group
   *
   * Log level: `info`
   *
   * @remarks
   * This will end the current group regardless of the log level, but the log message indicating the end of the group will only be printed if log level includes `info`.
   * If there is no group to end, this method will have no effect.
   * The groups are tracked regardless of the scope
   */
  groupEnd(): void {
    if (groupLevel.length === 0) return;

    groupLevel.pop();
    const groupLevelCurrent = groupLevel.filter((el) => el === 'g').length;

    if (!this.LOG_LEVEL.info) console.write(getLogTime(), `${'  '.repeat(groupLevelCurrent)}${ANSI_COLORS.intenseYellow}▁${ANSI_COLORS.reset}\n`);
    console.groupEnd();
  }

  /**
   * Print an info message
   *
   * Log level: `info`
   *
   * @param data The data to be printed
   */
  info(...data: unknown[]): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime());
    console.info(`${ANSI_COLORS.intenseBlue}i${ANSI_COLORS.blue}`, ...data, ANSI_COLORS.reset);
  }

  /**
   * Log a message
   *
   * Log level: `info`
   *
   * @param data The data to be printed
   */
  log(...data: unknown[]) {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime());
    console.log('•', ...data);
  }

  /**
   * Start profiling with a given label
   *
   * You can end profiling using the {@link Logger.profileEnd} method
   *
   * Log level: `info`
   *
   * @remarks
   * The `label` will automatically include the scope of the logger
   * The profile will not start if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   * This method uses `performance.now()` and not `console.profile` as the latter isn't currently implemented
   *
   * @param label The label for profiling, default is `default`
   * @experimental
   */
  profile(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    this.activeProfiles.set(label, performance.now());
    console.write(
      getLogTime(),
      `${'  '.repeat(groupLevel.filter((el) => el === 'g').length)}${ANSI_COLORS.intenseMagenta}⧗${ANSI_COLORS.magenta} Profile '${label}' started.${ANSI_COLORS.reset}\n`,
    );
    // console.profile(`${colors.intenseMagenta}⧗${colors.magenta} ${label}${colors.reset}`);
  }

  /**
   * End profiling with a given label and log the duration
   *
   * You can start profiling using the {@link Logger.profile} method
   *
   * Log level: `info`
   *
   * @remarks
   * The `label` will always automatically include the scope of the logger
   * The profile will not end if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   * If no active profile with the given label is found, a warning message will be logged instead
   * This method uses `performance.now()` and not `console.profileEnd` as the latter isn't currently implemented.
   *
   * @param label The label for profiling, default is `default`
   * @experimental
   */
  profileEnd(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime());
    const startTime = this.activeProfiles.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(
        `${'  '.repeat(groupLevel.filter((el) => el === 'g').length)}${ANSI_COLORS.intenseMagenta}⧖${ANSI_COLORS.magenta} Profile '${label}' ended: ${duration}ms${ANSI_COLORS.reset}`,
      );
      this.activeProfiles.delete(label);
    } else {
      console.warn(
        `${'  '.repeat(groupLevel.filter((el) => el === 'g').length)}${ANSI_COLORS.intenseYellow}⚠${ANSI_COLORS.yellow} No active profile found for label '${label}'.${ANSI_COLORS.reset}`,
      );
    }
    // console.profileEnd(`${colors.intenseMagenta}⧖${colors.magenta} ${label}${colors.reset}`);
  }

  /**
   * Print a table to the console
   *
   * Log level: `info`
   *
   * @param data The data for table
   * @param columns The columns to include in the table, if not provided all columns will be included
   */
  table(data: Array<Record<string, unknown>>, columns?: Array<string>): void;
  /**
   * Print a table to the console
   *
   * Log level: `info`
   *
   * @param data The data to be printed
   */
  table(data: Array<unknown>): void;
  table(data: unknown, columns?: Array<string>): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime(), '\n');
    console.table(data, columns);
  }

  /**
   * Start a timer with the given label
   *
   * The timer can be ended using the {@link Logger.timeEnd} method.
   * The {@link Logger.timeLog} method can be used to log the current duration without ending the timer.
   *
   * Log level: `info`
   *
   * @remarks
   * The timer label will automatically include the scope of the logger.
   * The timer will not start if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   * If a timer with the same label already exists, it will be overwritten with the new start time.
   *
   * @param label Label for measuring time, default is `default`
   */
  time(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.write(getLogTime(), `⏱ ${label}\n`);
    console.time(`${this.scope}${label}`);
  }

  /**
   * End a timer with the given label
   *
   * If there is no active timer with the given label, this method will have no effect.
   * The timer can be started using the {@link Logger.time} method, and the current duration can be logged without ending the timer using the {@link Logger.timeLog} method.
   *
   * Log level: `info`
   *
   * @remarks
   * The timer label will automatically include the scope of the logger.
   * The timer will not end if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   *
   * @param label The label for measuring time, default is `default`
   */
  timeEnd(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.timeEnd(`${this.scope}${label}`);
  }

  /**
   * Log current duration of a timer with the given label without ending the timer
   *
   * If there is no active timer with the given label, this method will have no effect.
   * The timer can be started using the {@link Logger.time} method, and it can be ended using the {@link Logger.timeEnd} method.
   *
   * Log level: `info`
   *
   * @remarks
   * The timer label will automatically include the scope of the logger.
   * The timer will not log if log level is set to a level that does not include info (e.g. `warn`, `error`, `none`).
   *
   * @param label The label for measuring time, default is `default`
   */
  timeLog(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.timeLog(`${this.scope}${label}`);
  }

  /**
   * This doesn't do anything at the moment
   *
   * Passed the label to `console.timeStamp`
   *
   * @remarks
   * The label will automatically include the scope of the logger.
   *
   * @param label
   * @experimental
   */
  timeStamp(label: string = 'default'): void {
    if (!this.LOG_LEVEL.info) return;
    console.timeStamp(`${this.scope}${label}`);
  }

  /**
   * Print a stack trace with the given data
   *
   * Log level: `verbose`
   *
   * @remarks
   * The stack trace might be indented incorectly
   * The stack tree will include the logger implementation
   *
   * @param data The data to be printed
   */
  trace(...data: unknown[]) {
    if (!this.LOG_LEVEL.verbose) return;
    console.write(getLogTime());
    console.trace(`${ANSI_COLORS.intenseMagenta}↳${ANSI_COLORS.magenta} Trace`, ...data, ANSI_COLORS.reset);
  }

  /**
   * Print a warning message
   *
   * Log level: `warnings`
   *
   * @param data The data to be printed
   */
  warn(...data: unknown[]): void {
    if (!this.LOG_LEVEL.warnings) return;
    console.write(getLogTime());
    console.warn(`${ANSI_COLORS.intenseYellow}⚠${ANSI_COLORS.yellow}`, ...data, ANSI_COLORS.reset);
  }
}

/**
 * Default logger instance
 *
 * @see {@link Logger.constructor}
 */
export const logger = new Logger();
