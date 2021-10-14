import { ColorEncoding } from '../color-encoding';
import { ColorConverterBase } from './converter-base';

export class RGB_HEX_Converter extends ColorConverterBase {
  static DEFAULT = this.Create();

  static Create() {
    return new RGB_HEX_Converter();
  }

  constructor() {
    super(ColorEncoding.RGB, ColorEncoding.HEX);
  }

  convert(rgb) {
    const integer = ((Math.round(args[0]) & 0xff) << 16) + ((Math.round(args[1]) & 0xff) << 8) + (Math.round(args[2]) & 0xff);

    const string = integer.toString(16).toUpperCase();
    return '000000'.substring(string.length) + string;
  }

  reverse(hex) {
    const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }

    let colorString = match[0];

    if (match[0].length === 3) {
      colorString = colorString
        .split('')
        .map(char => {
          return char + char;
        })
        .join('');
    }

    const integer = parseInt(colorString, 16);
    const r = (integer >> 16) & 0xff;
    const g = (integer >> 8) & 0xff;
    const b = integer & 0xff;

    return [r, g, b];
  }
}
