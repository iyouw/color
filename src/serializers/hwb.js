import { ColorEncoding } from '../color-encoding';
import { SerializerBase } from './serializer-base';

export class HWB_Serializer extends SerializerBase {
  static DEFAULT = HWB_Serializer.Create();

  static Create() {
    return new HWB_Serializer();
  }

  get encoding() {
    return ColorEncoding.HWB;
  }

  serialize(hwba) {
    let a = '';
    if (hwba.length >= 4 && hwba[3]) {
      a = ', ' + hwba[3];
    }

    return `hwb(${hwba[0]}, ${hwba[1]}%, ${hwba[2]}%${a})`;
  }
}
