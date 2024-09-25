import { Serializers } from '../serializer.ts';

/**
 * Abstract Serializer Implementation.
 */
export abstract class Serializer {
  protected serializing: Serializers | null = null;

  /**
   * Apply the Serializing Context.
   *
   * @param serializing The {@link Serializers} context.
   * @internal
   */
  public update(serializing: Serializers): void {
    this.serializing = serializing;
  }

  /**
   * Apply the serialization to a data construct.
   *
   * @param construct A spread capture of data contexts to transmit.
   */
  public abstract serialize(construct: unknown): string | null;
}
