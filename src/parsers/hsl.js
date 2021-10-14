import { Assert } from '../../assert';
import { ColorParserBase } from './parser-base';

export class HSL_Parser extends ColorParserBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HSL_Parser();
  }

  static REG_HSL = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?[\d\.]+)\s*)?\)$/;

  static PREFIX = 'hsl';

  get prefix() {
    return HSL_Parser.PREFIX;
  }

  parse(color) {
    Assert.IfNotThrow(color && typeof color === 'string', 'only string accepte', 'hsl_parser');

    const matches = color.match(HSL_Parser.REG_HSL);

    Assert.IfNotThrow(matches, `can not parse ${color}`, 'hsl_parser');

    const h = (parseFloat(matches[1]) + 360) % 360;
    const s = MathExtension.Clamp(parseFloat(matches[2]), 0, 100);
    const l = MathExtension.Clamp(parseFloat(matches[3]), 0, 100);
    const channels = [h, s, l];

    const alpha = MathExtension.Clamp(parseFloat(matches[4]), 0, 1);

    const encoding = ColorEncoding.HSL;

    return { channels, alpha, encoding };
  }
}
