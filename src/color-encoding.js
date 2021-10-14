export class ColorEncoding {
  static RGB = new ColorEncoding(1, 'rgb', 3, ['rgb']);

  static HSL = new ColorEncoding(3, 'hsl', 3, ['hsl']);

  static HSV = new ColorEncoding(5, 'hsv', 3, ['hsv']);

  static HWB = new ColorEncoding(7, 'hwb', 3, ['hwb']);

  static CMYK = new ColorEncoding(9, 'cmyk', 4, ['cmyk']);

  static XYZ = new ColorEncoding(12, 'xyz', 3, ['xyz']);

  static LAB = new ColorEncoding(17, 'lab', 3, ['lab']);

  static LCH = new ColorEncoding(27, 'lch', 3, ['lch']);

  static HEX = new ColorEncoding(31, 'hex', 1, ['hex']);

  static KEYWORD = new ColorEncoding(36, 'keyword', 1, ['keyword']);

  static ANSI16 = new ColorEncoding(56, 'ansi16', 1, ['ansi16']);

  static ANSI256 = new ColorEncoding(58, 'ansi256', 1, ['ansi256']);

  static HCG = new ColorEncoding(63, 'hcg', 3, ['h', 'c', 'g']);

  static APPLE = new ColorEncoding(69, 'apple', 3, ['r16', 'g16', '16']);

  static GRAY = new ColorEncoding(73, 'gray', 1, ['gray']);

  constructor(value, name, channels, labels) {
    this.value = value;
    this.name = name;
    this.channels = channels;
    this.labels = labels;
  }

  equals(encoding) {
    if (!encoding) {
      return false;
    }
    return encoding instanceof ColorEncoding && this.value === encoding.value;
  }

  toString() {
    return this.name;
  }
}
