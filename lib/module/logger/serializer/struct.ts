import { Serializer } from '../util/serializer.ts';

/**
 * Built-in Structure Serializer.
 *
 * Handles: Set, Map
 */
export class StructSerializer extends Serializer {
  public override serialize(construct: unknown): string | null {
    // Process Set Instances.
    if (construct instanceof Set) {
      const set = Array.from(construct.values()).map((v) => {
        return this.serializing!.execute(v);
      });
      return `SerialSet:{ ${set.join(', ')} }`;
    }

    // Process Map Instances.
    if (construct instanceof Map) {
      const map = Array.from(construct.entries()).map((v) => {
        return `${this.serializing!.execute(v[0])} => ${this.serializing!.execute(v[1])}`;
      });
      return `SerialMap:{ ${map.join(', ')} }`;
    }

    // Next Serializer.
    return null;
  }
}
