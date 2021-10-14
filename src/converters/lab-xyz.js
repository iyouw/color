import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class LAB_XYZ_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new LAB_XYZ_Converter();
  }

  constructor() {
    super(ColorEncoding.LAB, ColorEncoding.XYZ);
  }

  convert(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;

    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;

    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

    x *= 95.047;
    y *= 100;
    z *= 108.883;

    return [x, y, z];
  }

  reverse(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;

    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return [l, a, b];
  }
}
