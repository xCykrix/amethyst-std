import { Transport } from '../base/transport.ts';
import { ConsoleTransport } from '../transports/console.ts';
import { Serializers } from './serializer.ts';

export class Transporter {
  private readonly options: TransporterOptions;
  private readonly serializers = new Serializers();
  private transports: Transport[] = [];

  /**
   * Builds the Transporter Context.
   *
   * @param options The {@link TransporterOptions} to apply.
   * @param serializers The {@link Serializers} context.
   */
  public constructor(options: TransporterOptions, serializers: Serializers) {
    this.options = options;
    this.serializers = serializers;
  }

  /**
   * Adds a {@link Transport} to the current context.
   *
   * @param transports A spread capture of {@link Transport} to apply.
   */
  public addTransport(...transports: Transport[]): Transporter {
    transports.forEach((transport) => transport.setTransporterOptions(this.options));
    this.transports.push(...transports);
    return this;
  }

  /**
   * Adds a default {@link ConsoleTransport} instance for basic logging.
   */
  public defaults(): void {
    if (this.transports.length === 0) {
      const transport = new ConsoleTransport({});
      transport.setTransporterOptions(this.options);
      this.transports.push(transport);
    }
  }

  /**
   * Dispatch the context to the Transport.
   *
   * @param level The {@link LoggingSeverity}.
   * @param context A spread capture of data contexts to transmit.
   */
  public dispatch(level: LoggingSeverity, context: unknown[]): void {
    this.transports.forEach((transport) => {
      transport.impl(this.serializers, level, this.options.scope, context, new Date());
    });
  }
}

export interface TransporterOptions {
  scope: string;
  level: LoggingSeverity;
}

export enum LoggingSeverity {
  FATAL,
  SEVERE,
  WARNING,
  INFORM,
  TRACE,
}
