export class Serializers {
  protected serializers: Set<Serializer> = new Set();

  /**
   * Executes Serialization on the Data Constructs Provided.
   * @param construct
   */
  public execute(construct: unknown[]): string[] {
    return construct.map((constructable) => {
      // Call Serializers Registered (FIFO)
      for (const serializer of this.serializers) {
        const result = serializer.serialize(constructable);
        if (result === null) continue;
        return result as string;
      }
      // Handle JSON-able Objects
      if (typeof constructable === 'object') {
        return JSON.stringify(constructable);
      }

      // Fallback to 'toString()' with undefined/null failsafe.
      return (constructable !== undefined && constructable !== null ? constructable.toString() : 'null');
    });
  }

  /**
   * Adds a {@link Serializer} to the current context.
   *
   * @param serializer The {@link Serializer} to add.
   */
  public addSerializer(serializer: Serializer): void {
    serializer.update(this);
    this.serializers.add(serializer);
  }
}

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
