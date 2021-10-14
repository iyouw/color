import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class HSV_HCG_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HSV_HCG_Converter();
  }

  constructor() {
    super(ColorEncoding.HSV, ColorEncoding.HCG);
  }

  convert(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;

    const c = s * v;
    let f = 0;

    if (c < 1.0) {
      f = (v - c) / (1 - c);
    }

    return [hsv[0], c * 100, f * 100];
  }

  reverse(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;

    const v = c + g * (1.0 - c);
    let f = 0;

    if (v > 0.0) {
      f = c / v;
    }

    return [hcg[0], f * 100, v * 100];
  }
}
