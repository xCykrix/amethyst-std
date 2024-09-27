# amethyst-std

---

Standard Context Fillers and APIs for Deno (and Web).

**jsr:@amethyst/standard**

---

### Standard Libraries

- Logging API

```typescript
import { Logging } from 'jsr:@amethyst/standard';

const logging = new Logging()
  .createJSONLogger('DEBUG') // Enables Console
  .createFileLogger('WARN') // Enabled File System
  .createDefaultLoggerVariants() // Builds Defaults for getLogger()
  .build();

// Valid getLogger are 'frontend' | 'backend' | 'cli' | 'fs'.
const frontend = logging.getLogger('frontend');

// Calling the Logger.
frontend.debug('fe debug');
frontend.info('fe info');
frontend.warn('fe warn');
frontend.error('fe error');
frontend.critical('fe critical');
```
