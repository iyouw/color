import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';
import { RGB_HSL_Converter } from './rgb-hsl';

export class RGB_HWB_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new RGB_HWB_Converter();
  }

  constructor() {
    super(ColorEncoding.RGB, ColorEncoding.HWB);
  }

  convert(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = RGB_HSL_Converter.DEFAULT.convert(rgb)[0];
    // const h = convert.rgb.hsl(rgb)[0];
    const w = (1 / 255) * Math.min(r, Math.min(g, b));

    b = 1 - (1 / 255) * Math.max(r, Math.max(g, b));

    return [h, w * 100, b * 100];
  }

  reverse(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;

    // Wh + bl cant be > 1
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }

    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;

    if ((i & 0x01) !== 0) {
      f = 1 - f;
    }

    const n = wh + f * (v - wh); // Linear interpolation

    let r;
    let g;
    let b;

    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }

    return [r * 255, g * 255, b * 255];
  }
}
