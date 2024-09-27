import type { LogRecord } from '@std/log';

export function cli(logRecord: LogRecord): string {
  return `${logRecord.levelName.padStart(8, ' ')} [${logRecord.datetime.toISOString()}] (${logRecord.loggerName}): ${logRecord.msg} ${logRecord.args}`;
}

export function json(logRecord: LogRecord): string {
  return JSON.stringify({
    level: logRecord.levelName,
    t: logRecord.datetime.toISOString(),
    origin: logRecord.loggerName,
    message: logRecord.msg,
    ctx: flatten(logRecord.args),
  });
}

function flatten(context: unknown[]): unknown {
  if (context.length === 1) {
    return context[0];
  } else if (context.length > 1) {
    return context;
  }
  return undefined;
}
