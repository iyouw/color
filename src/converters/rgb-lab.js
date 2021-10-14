import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class RGB_LAB_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new RGB_LAB_Converter();
  }

  constructor() {
    super(ColorEncoding.RGB, ColorEncoding.LAB);
  }

  convert(rgb) {
    const xyz = convert.rgb.xyz(rgb);
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
