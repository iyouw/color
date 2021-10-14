import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class RGB_CMYK_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new RGB_CMYK_Converter();
  }

  constructor() {
    super(ColorEncoding.RGB, ColorEncoding.CMYK);
  }

  convert(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return [c * 100, m * 100, y * 100, k * 100];
  }

  reverse(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;

    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);

    return [r * 255, g * 255, b * 255];
  }
}
