import { Assert } from '../../assert';
import { ColorParserBase } from './parser-base';

export class HWB_Parser extends ColorParserBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HWB_Parser();
  }

  static REG_HWB = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;

  static PREFIX = 'hwb';

  get prefix() {
    return HWB_Parser.PREFIX;
  }

  parse(color) {
    Assert.IfNotThrow(color && typeof color === 'string', 'only string accepte', 'hwb_parser');

    const matches = color.match(HWB_Parser.REG_HWB);

    Assert.IfNotThrow(matches, `can not parse ${color}`, 'hwb_parser');

    const h = ((parseFloat(matches[1]) % 360) + 360) % 360;
    const w = MathExtension.Clamp(parseFloat(matches[2]), 0, 100);
    const b = MathExtension.Clamp(parseFloat(matches[3]), 0, 100);
    const channels = [h, w, b];

    const alpha = MathExtension.Clamp(parseFloat(matches[4]), 0, 1);

    const encoding = ColorEncoding.HWB;

    return { channels, alpha, encoding };
  }
}
