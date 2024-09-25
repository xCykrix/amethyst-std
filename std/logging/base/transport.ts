import { Serializers } from '../lib/serializer.ts';
import { LoggingSeverity, TransporterOptions } from '../lib/transporter.ts';

/**
 * Abstract Transport Implementation.
 */
export abstract class Transport {
  protected options: TransportOptions;
  protected transporterOptions: TransporterOptions | null = null;

  public constructor(options: TransportOptions) {
    this.options = options;
  }

  public setTransporterOptions(options: TransporterOptions): void {
    this.transporterOptions = options;
  }

  public abstract impl(serializing: Serializers, level: LoggingSeverity, scope: string, context: unknown[], date: Date): void;
}

export interface TransportOptions {
  _?: null;
}
