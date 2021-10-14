import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class HSL_HCG_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HSL_HCG_Converter();
  }

  constructor() {
    super(ColorEncoding.HSL, ColorEncoding.HCG);
  }

  convert(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;

    const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);

    let f = 0;
    if (c < 1.0) {
      f = (l - 0.5 * c) / (1.0 - c);
    }

    return [hsl[0], c * 100, f * 100];
  }

  reverse(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;

    const l = g * (1.0 - c) + 0.5 * c;
    let s = 0;

    if (l > 0.0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1.0) {
      s = c / (2 * (1 - l));
    }

    return [hcg[0], s * 100, l * 100];
  }
}
