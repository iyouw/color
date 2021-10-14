import { Assert } from '../../assert';
import { ColorEncoding } from '../color-encoding';
import { ColorParserBase } from './parser-base';

export class RGB_Parser extends ColorParserBase {
  static DEFAULT = this.Create();

  static Create() {
    return new RGB_Parser();
  }

  static REG_RGB = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  static REG_RGB_PER = /^rgba?\s*\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;

  static PREFIX = 'rgb';

  get prefix() {
    return RGB_Parser.PREFIX;
  }

  parse(color) {
    Assert.IfNotThrow(color && typeof color === 'string', 'only string accepte', 'rgb_parser');

    let res, matches;

    if ((matches = color.match(RGB_Parser.REG_RGB))) {
      res = this.parserChannels(matches);
    } else if ((matches = color.match(RGB_Parser.REG_RGB_PER))) {
      res = this.parserChannels(matches, true);
    } else {
      Assert.Throw(`can not parse ${color}`, 'rgb_parser');
    }

    const { channels, alpha } = res;

    const encoding = ColorEncoding.RGB;

    return { channels, alpha, encoding };
  }

  parserChannels(matches, isPer = false) {
    const channels = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
      channels[i] = isPer ? Math.round(parseFloat(matches[i + 1]) * 2.55) : parseInt(matches[i + 1]);
    }

    const alpha = matches[4] ? parseFloat(matches[4]) : NaN;

    return { channels, alpha };
  }
}
