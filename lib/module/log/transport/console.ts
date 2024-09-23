import { Serializers } from '../util/serializer.ts';
import { Transport, TransporterSeverity } from '../util/transporter.ts';
import { brightBlue, brightCyan, brightRed, brightYellow, dim, red } from '@std/fmt/colors';

export class ConsoleTransport extends Transport {
  public override impl(serializing: Serializers, level: TransporterSeverity, scope: string, context: unknown[], date: Date): void {
    // Build the Transport Context.
    const timestampText = dim(date.toISOString());
    let levelText = (Object.keys(TransporterSeverity)[Object.values(TransporterSeverity).indexOf(level)] ?? 'Unknown').padStart(7, ' ');
    let text = `${scope}: ${serializing.execute(context)}`;

    // Process Level Coloring. Handles Level Filtering from TransporterOptions.
    switch (level) {
      case TransporterSeverity.FATAL: {
        levelText = red(levelText);
        text = red(text);
        break;
      }
      case TransporterSeverity.SEVERE: {
        if ((this.transporterOptions?.level ?? TransporterSeverity.SEVERE) < TransporterSeverity.SEVERE) return;
        levelText = brightRed(levelText);
        text = brightRed(text);
        break;
      }
      case TransporterSeverity.WARNING: {
        if ((this.transporterOptions?.level ?? TransporterSeverity.WARNING) < TransporterSeverity.WARNING) return;
        levelText = brightYellow(levelText);
        break;
      }
      case TransporterSeverity.INFORM: {
        if ((this.transporterOptions?.level ?? TransporterSeverity.INFORM) < TransporterSeverity.INFORM) return;
        levelText = brightBlue(levelText);
        break;
      }
      case TransporterSeverity.TRACE: {
        if ((this.transporterOptions?.level ?? TransporterSeverity.TRACE) < TransporterSeverity.TRACE) return;
        levelText = brightCyan(levelText);
        break;
      }
    }

    // Format Message.
    const formatted = `${timestampText} ${levelText} ${text}`;

    // Process Message.
    switch (level) {
      case TransporterSeverity.FATAL || TransporterSeverity.SEVERE: {
        console.error(formatted);
        break;
      }
      case TransporterSeverity.WARNING: {
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
