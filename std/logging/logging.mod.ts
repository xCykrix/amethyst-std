import { ConsoleHandler, getLogger, type LevelName, type LogConfig, type Logger, type LoggerConfig, RotatingFileHandler, setup } from '@std/log';
import { cli, json } from './lib/formatter.ts';

// Types
type LoggerVariant = 'frontend' | 'backend' | 'cli' | 'fs';
type LoggerHandlers = 'json' | 'fs';

// Interface
interface LoggerVariantConfig extends LoggerConfig {
  handlers: LoggerHandlers[];
}

/**
 * logging.mod.ts Logging Standard API
 */
export class Logging {
  /** Toggle for Console Logger.
   * @internal */
  private createdConsoleLogger: boolean = false;
  /** Toggle for File Logger
   * @internal */
  private createdFileLogger: boolean = false;
  /** Controls the State
   * @internal */
  private state: LogConfig = {
    handlers: {},
    loggers: {},
  };

  /**
   * Create the Console Logger(s).
   *
   * @param level The {@link LevelName} to filter below. Use 'DEBUG' for all.
   * @returns Logging
   */
  public createConsoleLogger(level: LevelName): Logging {
    this.state.handlers!['cli'] = new ConsoleHandler(level, {
      formatter: cli,
      useColors: true,
    });
    this.state.handlers!['json'] = new ConsoleHandler(level, {
      formatter: json,
      useColors: true,
    });
    this.createdConsoleLogger = true;
    return this;
  }

  /**
   * Create the File Logger(s).
   *
   * @param level The {@link LevelName} to filter below. Use 'DEBUG' for all.
   * @returns Logging
   */
  public createFileLogger(level: LevelName): Logging {
    this.state.handlers!['fs'] = new RotatingFileHandler(level, {
      formatter: json,
      filename: 'latest.log',
      mode: 'a',
      bufferSize: 8192,
      maxBytes: 20 * 1024 * 1024,
      maxBackupCount: 3,
    });
    this.createdFileLogger = true;
    return this;
  }

  /**
   * Create the Default Logger Variants of 'frontend' | 'backend' | 'cli' | 'fs'.
   *
   * @returns Logging
   */
  public createDefaultLoggerVariants(): Logging {
    this.createLoggerVariant('frontend', {
      level: 'DEBUG',
      handlers: [this.createdConsoleLogger ? 'json' : null, this.createdFileLogger ? 'fs' : null].filter((v) => v !== null) as LoggerHandlers[],
    });
    this.createLoggerVariant('backend', {
      level: 'DEBUG',
      handlers: [this.createdConsoleLogger ? 'json' : null, this.createdFileLogger ? 'fs' : null].filter((v) => v !== null) as LoggerHandlers[],
    });
    this.createLoggerVariant('cli', {
      level: 'DEBUG',
      handlers: [this.createdConsoleLogger ? 'cli' : null].filter((v) => v !== null) as LoggerHandlers[],
    });
    this.createLoggerVariant('fs', {
      level: 'DEBUG',
      handlers: [this.createdFileLogger ? 'fs' : null].filter((v) => v !== null) as LoggerHandlers[],
    });
    return this;
  }

  /**
   * Create a LoggerVariant.
   *
   * @param id The {@link LoggerVarient} Identifier.
   * @param options The {@link LoggerVariantConfig}..
   * @returns Logging
   * @internal
   */
  private createLoggerVariant(id: LoggerVariant, options: LoggerVariantConfig): Logging {
    this.state.loggers![id] = {
      level: options.level ?? 'DEBUG',
      handlers: [...options.handlers ?? []],
    };
    return this;
  }

  /**
   * Configures {@link https://jsr.io/@std/log}
   *
   * @returns
   */
  public build(): Logging {
    setup(this.state);
    return this;
  }

  /**
   * Fetch a {@link Logger} instance from @std/log.
   *
   * @param id The {@link LoggerVariant} to fetch.
   * @returns A Logger.
   */
  public getLogger(id: LoggerVariant = 'cli'): Logger {
    return getLogger(id);
  }
}
