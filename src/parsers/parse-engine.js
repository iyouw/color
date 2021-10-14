import { Assert } from '../../assert';
import { HEX_Parser } from './hex';
import { HSL_Parser } from './hsl';
import { HWB_Parser } from './hwb';
import { RGB_Parser } from './rgb';

export class ColorParseEngine {
  static DEFAULT = this.Create();

  static Create() {
    const parsers = [HEX_Parser.DEFAULT, RGB_Parser.DEFAULT, HSL_Parser.DEFAULT, HWB_Parser.DEFAULT];
    return new ColorParseEngine(parsers);
  }

  constructor(parsers) {
    this.parsers = parsers;
  }

  parse(color) {
    const parser = this.getParser(color);
    return parser.parse(color);
  }

  getParser(color) {
    for (const parser of this.parsers) {
      if (parser.canParse(color)) {
        return parser;
      }
    }
    Assert.Throw(`can not parse ${color}`, 'ColorParseEngine');
  }
}
