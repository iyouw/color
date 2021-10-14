import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class HWB_HCG_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HWB_HCG_Converter();
  }

  constructor() {
    super(ColorEncoding.HWB, ColorEncoding.HCG);
  }

  convert(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;

    if (c < 1) {
      g = (v - c) / (1 - c);
    }

    return [hwb[0], c * 100, g * 100];
  }

  reverse(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1.0 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  }
}
