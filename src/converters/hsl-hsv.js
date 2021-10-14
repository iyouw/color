import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class HSL_HSV_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HSL_HSV_Converter();
  }

  constructor() {
    super(ColorEncoding.HSL, ColorEncoding.HSV);
  }

  convert(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);

    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

    return [h, sv * 100, v * 100];
  }

  reverse(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;

    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;

    return [h, sl * 100, l * 100];
  }
}
