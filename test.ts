import { Logging, LoggingSeverity } from './std/logging/logging.std.ts';

const logger = new Logging(
  {
    scope: 'cli',
    level: LoggingSeverity.TRACE,
  },
  [],
  [],
);

logger.trace('Debuggable Trace!');
logger.inform('Information!');
logger.warning('Uh oh! Something odd happened.');
logger.severe('A severe error occurred!');
logger.fatal('A fatal error occurred!');
