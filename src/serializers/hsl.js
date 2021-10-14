import { ColorEncoding } from '../color-encoding';
import { SerializerBase } from './serializer-base';

export class HSL_Serializer extends SerializerBase {
  static DEFAULT = HSL_Serializer.Create();

  static Create() {
    return new HSL_Serializer();
  }

  get encoding() {
    return ColorEncoding.HSL;
  }

  serialize(hsla) {
    return hsla.length < 4 || !hsla[3] ? `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)` : `hsla(${hsla[0]},${hsla[1]}%,'${hsla[2]}%,${hsla[3]})`;
  }
}
