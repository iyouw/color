import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class LAB_LCH_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new LAB_LCH_Converter();
  }

  constructor() {
    super(ColorEncoding.LAB, ColorEncoding.LCH);
  }

  convert(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;

    const hr = Math.atan2(b, a);
    h = (hr * 360) / 2 / Math.PI;

    if (h < 0) {
      h += 360;
    }

    const c = Math.sqrt(a * a + b * b);

    return [l, c, h];
  }

  reverse(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];

    const hr = (h / 360) * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);

    return [l, a, b];
  }
}
