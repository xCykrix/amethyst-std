import { Serializer } from '../base/serialize.ts';

/**
 * Built-in Structure Serializer.
 *
 * Handles: Set, Map
 */
export class MapSerializeStruct extends Serializer {
  public override serialize(construct: unknown): string | null {
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
