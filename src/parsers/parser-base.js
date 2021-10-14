import { Assert } from '../../assert';

export class ColorParserBase {
  get prefix() {}

  parse(color) {}

  canParse(color) {
    Assert.IfNotThrow(color && typeof color === 'string', `can not parser ${JSON.stringify(color)}`, 'ColorParser');
    return this.truncatePrefix(color) === this.prefix;
  }

  truncatePrefix(color) {
    return color.slice(0, 3).toLowerCase();
  }
}
