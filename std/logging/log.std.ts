import { Serializers } from './serializer.ts';
import { SetSerializeStruct } from './struct/set.ts';
import { Transporter, TransporterOptions } from './transporter.ts';
import { Transport, TransportSeverity } from './base/transport.ts';
import { MapSerializeStruct } from './struct/map.ts';
import { Serializer } from './base/serialize.ts';

// noinspection JSUnusedGlobalSymbols
class Log {
  private readonly serializers = new Serializers();
  private readonly transporter: Transporter;

  /**
   * log.std.ts: Standardized Logger with Console, JSON, and Fixed/Custom Transport Support.
   *
   * Initialize a Logger Instance.
   *
   * @example
   * ```
   * import { Log, TransporterSeverity } from "@amethyst/standard";
   * const logging: Log = new Log({
   *   scope: "cli",
   *   level: TransporterSeverity.TRACE
   * });
   * ```
   *
   * @param options The {@link TransportOptions}.
   * @param transports A list of the {@link Transport} instances.
   * @param serializers A list of additional {@link Serializer} to scan.
   */
  public constructor(options: TransporterOptions, transports: Transport[] = [], serializers: Serializer[] = []) {
    // Load Serializers
    this.serializers.addSerializers(new SetSerializeStruct());
    this.serializers.addSerializers(new MapSerializeStruct());
    this.serializers.addSerializers(...serializers);

    // Load Transports
    this.transporter = new Transporter(options, this.serializers);
    this.transporter.addTransport(...transports);
    this.transporter.defaults();
  }

  /**
   * Specific call to the Transporter APIs.
   *
   * @param level The {@link TransportSeverity} to apply.
   * @param context A spread capture of data contexts to transmit.
   */
  public call(level: TransportSeverity, ...context: unknown[]): void {
    this.transporter.dispatch(level, context);
  }

  /**
   * Trace call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public trace(...context: unknown[]): void {
    this.call(TransportSeverity.TRACE, ...context);
  }

  /**
   * Inform call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public inform(...context: unknown[]): void {
    this.call(TransportSeverity.INFORM, ...context);
  }

  /**
   * Warning call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public warning(...context: unknown[]): void {
    this.call(TransportSeverity.WARNING, ...context);
  }

  /**
   * Severe call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public severe(...context: unknown[]): void {
    this.call(TransportSeverity.SEVERE, ...context);
  }

  /**
   * Fatal call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public fatal(...context: unknown[]): void {
    this.call(TransportSeverity.FATAL, ...context);
  }
}

export { Log, TransportSeverity };
