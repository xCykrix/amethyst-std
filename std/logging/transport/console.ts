import { Serializers } from '../serializer.ts';
import { brightBlue, brightCyan, brightRed, brightYellow, dim, red } from '@std/fmt/colors';
import { Transport, TransportSeverity } from '../base/transport.ts';

export class ConsoleTransport extends Transport {
  public override impl(serializing: Serializers, level: TransportSeverity, scope: string, context: unknown[], date: Date): void {
    // Build the Transport Context.
    const timestampText = dim(date.toISOString());
    let levelText = (Object.keys(TransportSeverity)[Object.values(TransportSeverity).indexOf(level)] ?? 'Unknown').padStart(7, ' ');
    let text = `${scope}: ${serializing.execute(context)}`;

    // Process Level Coloring. Handles Level Filtering from TransporterOptions.
    switch (level) {
      case TransportSeverity.FATAL: {
        levelText = red(levelText);
        text = red(text);
        break;
      }
      case TransportSeverity.SEVERE: {
        if ((this.transporterOptions?.level ?? TransportSeverity.SEVERE) < TransportSeverity.SEVERE) return;
        levelText = brightRed(levelText);
        text = brightRed(text);
        break;
      }
      case TransportSeverity.WARNING: {
        if ((this.transporterOptions?.level ?? TransportSeverity.WARNING) < TransportSeverity.WARNING) return;
        levelText = brightYellow(levelText);
        break;
      }
      case TransportSeverity.INFORM: {
        if ((this.transporterOptions?.level ?? TransportSeverity.INFORM) < TransportSeverity.INFORM) return;
        levelText = brightBlue(levelText);
        break;
      }
      case TransportSeverity.TRACE: {
        if ((this.transporterOptions?.level ?? TransportSeverity.TRACE) < TransportSeverity.TRACE) return;
        levelText = brightCyan(levelText);
        break;
      }
    }

    // Format Message.
    const formatted = `${timestampText} ${levelText} ${text}`;

    // Process Message.
    switch (level) {
      case TransportSeverity.FATAL || TransportSeverity.SEVERE: {
        console.error(formatted);
        break;
      }
      case TransportSeverity.WARNING: {
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
