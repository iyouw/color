import { ColorEncoding } from '../color-encoding';
import { SerializerBase } from './serializer-base';

export class RGB_Serializer extends SerializerBase {
  static DEFAULT = RGB_Serializer.Create();

  static Create() {
    return new RGB_Serializer();
  }

  get encoding() {
    return ColorEncoding.RGB;
  }

  serialize(rgba) {
    return rgba.length < 4 || !rgba[3]
      ? `rgb(${Math.round(rgba[0])}, ${Math.round(rgba[1])}, ${Math.round(rgba[2])})`
      : `rgba(${Math.round(rgba[0])}, ${Math.round(rgba[1])}, ${Math.round(rgba[2])}, ${rgba[3]})`;
  }
}
