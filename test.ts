import { Logging } from './std/logging/logging.mod.ts';

const logging = new Logging()
  .createConsoleLogger('DEBUG')
  .createFileLogger('WARN')
  .createDefaultLoggerVariants()
  .build();

const frontend = logging.getLogger('frontend');

frontend.debug('fe debug');
frontend.info('fe info');
frontend.warn('fe warn');
frontend.error('fe error');
frontend.critical('fe critical');
