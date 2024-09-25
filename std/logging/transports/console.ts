import { brightBlue, brightCyan, brightRed, brightYellow, dim, red } from '@std/fmt/colors';
import { Transport } from '../base/transport.ts';
import { Serializers } from '../lib/serializer.ts';
import { LoggingSeverity } from '../lib/transporter.ts';

export class ConsoleTransport extends Transport {
  public override impl(serializing: Serializers, level: LoggingSeverity, scope: string, context: unknown[], date: Date): void {
    // Build the Transport Context.
    const timestampText = dim(date.toISOString());
    let levelText = (Object.keys(LoggingSeverity)[Object.values(LoggingSeverity).indexOf(level)] ?? 'Unknown').padStart(7, ' ');
    let text = `${scope}: ${serializing.execute(context)}`;

    // Process Level Coloring. Handles Level Filtering from TransporterOptions.
    switch (level) {
      case LoggingSeverity.FATAL: {
        levelText = red(levelText);
        text = red(text);
        break;
      }
      case LoggingSeverity.SEVERE: {
        if ((this.transporterOptions?.level ?? LoggingSeverity.SEVERE) < LoggingSeverity.SEVERE) return;
        levelText = brightRed(levelText);
        text = brightRed(text);
        break;
      }
      case LoggingSeverity.WARNING: {
        if ((this.transporterOptions?.level ?? LoggingSeverity.WARNING) < LoggingSeverity.WARNING) return;
        levelText = brightYellow(levelText);
        break;
      }
      case LoggingSeverity.INFORM: {
        if ((this.transporterOptions?.level ?? LoggingSeverity.INFORM) < LoggingSeverity.INFORM) return;
        levelText = brightBlue(levelText);
        break;
      }
      case LoggingSeverity.TRACE: {
        if ((this.transporterOptions?.level ?? LoggingSeverity.TRACE) < LoggingSeverity.TRACE) return;
        levelText = brightCyan(levelText);
        break;
      }
    }

    // Format Message.
    const formatted = `${timestampText} ${levelText} ${text}`;

    // Process Message.
    switch (level) {
      case LoggingSeverity.FATAL || LoggingSeverity.SEVERE: {
        console.error(formatted);
        break;
      }
      case LoggingSeverity.WARNING: {
        console.warn(formatted);
        break;
      }
      default: {
        console.info(formatted);
        break;
      }
    }
  }
}
