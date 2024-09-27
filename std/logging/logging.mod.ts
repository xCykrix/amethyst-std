import { ConsoleHandler, getLogger, type LevelName, type LogConfig, type Logger, type LoggerConfig, RotatingFileHandler, setup } from '@std/log';
import { cli, json } from './lib/formatter.ts';

type LoggerVariant = 'frontend' | 'backend' | 'cli' | 'fs';
type LoggerHandlers = 'json' | 'fs';

interface LoggerVariantConfig extends LoggerConfig {
  handlers: LoggerHandlers[];
}

export class Logging {
  private createdConsoleLogger: boolean = false;
  private createdFileLogger: boolean = false;

  private state: LogConfig = {
    handlers: {},
    loggers: {},
  };

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

  public createLoggerVariant(id: LoggerVariant, options: LoggerVariantConfig): Logging {
    this.state.loggers![id] = {
      level: options.level ?? 'DEBUG',
      handlers: [...options.handlers ?? []],
    };
    return this;
  }

  public build(): Logging {
    setup(this.state);
    return this;
  }

  public getLogger(id: LoggerVariant = 'cli'): Logger {
    return getLogger(id);
  }
}
