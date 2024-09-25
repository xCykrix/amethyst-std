import { Serializer } from './base/serialize.ts';

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
   * @param serializers A spread capture of {@link Serializer} to add.
   */
  public addSerializers(...serializers: Serializer[]): void {
    for (const serializer of serializers) {
      serializer.update(this);
      this.serializers.add(serializer);
    }
  }
}
