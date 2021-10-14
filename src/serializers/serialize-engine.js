import { Assert } from '../../assert';
import { HSL_Serializer } from './hsl';
import { HWB_Serializer } from './hwb';
import { RGB_Serializer } from './rgb';

export class ColorSerializeEngine {
  static DEFAULT = ColorSerializeEngine.Create();

  static Create() {
    const serializer = [RGB_Serializer.DEFAULT, HSL_Serializer.DEFAULT, HWB_Serializer.DEFAULT];
    return new ColorSerializeEngine(serializer);
  }

  constructor(serializers) {
    this.serializers = serializers;
  }

  serialize(colorArray, encoding) {
    const serizelizer = this.getSerializer(encoding);
    return serizelizer.serialize(colorArray);
  }

  getSerializer(encoding) {
    for (let serializer of this.serializers) {
      if (serializer.canSerialize(encoding)) {
        return serializer;
      }
    }
    Assert.Throw(`can not serialize to ${encoding} format`, 'ColorSerializeEngine');
  }
}
