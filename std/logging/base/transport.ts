import { TransporterOptions } from '../transporter.ts';
import { Serializers } from '../serializer.ts';

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

  public abstract impl(serializing: Serializers, level: TransportSeverity, scope: string, context: unknown[], date: Date): void;
}

export interface TransportOptions {
  _?: null;
}

export enum TransportSeverity {
  FATAL,
  SEVERE,
  WARNING,
  INFORM,
  TRACE,
}
