import { Log, TransportSeverity } from './std/logging/log.std.ts';

const logger = new Log(
  {
    scope: 'cli',
    level: TransportSeverity.TRACE,
  },
  [],
  [],
);

logger.trace('Debuggable Trace!');
logger.inform('Information!');
logger.warning('Uh oh! Something odd happened.');
logger.severe('A severe error occurred!');
logger.fatal('A fatal error occurred!');
