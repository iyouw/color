import { Assert } from '../../assert';
import { ColorEncoding } from '../color-encoding';
import { ColorParserBase } from './parser-base';

export class HEX_Parser extends ColorParserBase {
  static DEFAULT = this.Create();

  static Create() {
    return new HEX_Parser();
  }

  static REG_HEX = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  static REG_HEX_ABBR = /^#([a-f0-9]{3,4})$/i;

  static MIN_LENGTH = 6 + 1;
  static PREFIX = '#';

  get prefix() {
    return HEX_Parser.PREFIX;
  }

  truncatePrefix(color) {
    return color[0];
  }

  parse(color) {
    Assert.IfNotThrow(color && typeof color === 'string', 'only string accepte', 'hex_parser');

    const { channels, alpha } = color.length < HEX_Parser.MIN_LENGTH ? this.parseAbbr(color) : this.parseNormal(color);
    const encoding = ColorEncoding.RGB;

    return { channels, alpha, encoding };
  }

  parseNormal(color) {
    const matches = color.match(HEX_Parser.REG_HEX);

    Assert.IfNotThrow(matches, `can not parse ${color}`, 'hex_parser');

    const channels = [0, 0, 0];
    const colorString = matches[1];

    for (let i = 0; i < 3; i++) {
      channels[i] = parseInt(colorString.slice(i * 2, i * 2 + 2), 16);
    }

    const alpha = matches[2] ? parseFloat(matches[2], 16) / 255 : NaN;

    return { channels, alpha };
  }

  parseAbbr(color) {
    const matches = color.match(HEX_Parser.REG_HEX);

    Assert.IfNotThrow(matches, `can not parse ${color}`, 'hex_parser');

    const match = matches[1];

    const channels = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      channels[i] = parseInt(match[i] + match[i], 16);
    }

    const alpha = match[4] ? parseFloat(match[4], 16) / 255 : NaN;

    return { channels, alpha };
  }
}
