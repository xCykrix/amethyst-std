import { Serializers } from './util/serializer.ts';
import { StructSerializer } from './serializer/struct.ts';
import { Transport, Transporter, TransporterOptions, TransporterSeverity } from './util/transporter.ts';

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
   * const logger: Log = new Log({
   *   scope: "cli",
   *   level: TransporterSeverity.TRACE
   * });
   * ```
   *
   * @param options The {@link TransportOptions}.
   * @param transports A spread capture of the {@link Transport} instances.
   */
  public constructor(options: TransporterOptions, ...transports: Transport[]) {
    // Load Serializers
    this.serializers.addSerializer(new StructSerializer());

    // Load Transports
    this.transporter = new Transporter(options, this.serializers);
    this.transporter.addTransport(...transports);
    this.transporter.defaults();
  }

  /**
   * Specific call to the Transporter APIs.
   *
   * @param level The {@link TransporterSeverity} to apply.
   * @param context A spread capture of data contexts to transmit.
   */
  public call(level: TransporterSeverity, ...context: unknown[]): void {
    this.transporter.dispatch(level, context);
  }

  /**
   * Trace call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public trace(...context: unknown[]): void {
    this.call(TransporterSeverity.TRACE, ...context);
  }

  /**
   * Inform call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public inform(...context: unknown[]): void {
    this.call(TransporterSeverity.INFORM, ...context);
  }

  /**
   * Warning call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public warning(...context: unknown[]): void {
    this.call(TransporterSeverity.WARNING, ...context);
  }

  /**
   * Severe call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public severe(...context: unknown[]): void {
    this.call(TransporterSeverity.SEVERE, ...context);
  }

  /**
   * Fatal call to Transporter APIs.
   * @param context A spread capture of data contexts to transmit.
   */
  public fatal(...context: unknown[]): void {
    this.call(TransporterSeverity.FATAL, ...context);
  }
}

export { Log };
