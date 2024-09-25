import { Serializer } from '../base/serialize.ts';

/**
 * Built-in Structure Serializer.
 *
 * Handles: Set, Map
 */
export class SetSerializeStruct extends Serializer {
  public override serialize(construct: unknown): string | null {
    // Process Set Instances.
    if (construct instanceof Set) {
      const set = Array.from(construct.values()).map((v) => {
        return this.serializing!.execute(v);
      });
      return `SerialSet:{ ${set.join(', ')} }`;
    }

    // Next Serializer.
    return null;
  }
}
