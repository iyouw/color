import { Assert } from '../assert';
import { MathExtension } from '../extensions/math';
import { ColorEncoding } from './color-encoding';
import { ColorConvertEngine } from './converters/convert-engine';
import { ColorParseEngine } from './parsers/parse-engine';
import { ColorSerializeEngine } from './serializers/serialize-engine';

export class Color {
  static PARSE_ENGINE = ColorParseEngine.DEFAULT;

  static CONVERT_ENGINE = ColorConvertEngine.DEFAULT;

  static SERIALIZER_ENGINE = ColorSerializeEngine.DEFAULT;

  static WHITE = Color.FromRGBA(255, 255, 255, 1);
  static BLACK = Color.FromRGBA(0, 0, 0, 1);

  static From(color) {
    Assert.IfNotThrow(color, 'can not parse color,color is null', 'Color');

    const { channels, alpha, encoding } = Color.PARSE_ENGINE.parse(color);
    return new Color(channels, alpha, encoding);
  }

  static FromRGBA(r, g, b, a) {
    const channels = [r, g, b];
    const alpha = a;
    const encoding = ColorEncoding.RGB;
    return new Color(channels, alpha, encoding);
  }

  static Mix(color1, color2, weight) {
    if (!color1) {
      Assert.Throw(`Argument to "mix" was not a Color instance, but rather an instance of ${typeof color1}`);
    }

    if (!color2) {
      Assert.Throw(`Argument to "mix" was not a Color instance, but rather an instance of ${typeof color2}`);
    }

    const color1RGB = color1.rgb;
    const color2RGB = color2.rgb;

    const p = weight === undefined ? 0.5 : weight;
    const w = 2 * p - 1;
    const a = (color1RGB.alpha() || 1) - (color2RGB.alpha() || 1);

    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
    const w2 = 1 - w1;

    return Color.FromRGBA(
      w1 * color1RGB.red() + w2 * color2RGB.red(),
      w1 * color1RGB.green() + w2 * color2RGB.green(),
      w1 * color1RGB.blue() + w2 * color2RGB.blue(),
      color1RGB.alpha() * p + color2RGB.alpha() * (1 - p)
    );
  }

  static Shift(color, weight) {
    console.log(weight);
    return weight > 0 ? Color.Shade(color, weight) : Color.Tint(color, -weight);
  }

  static Tint(color, weight) {
    return Color.Mix(Color.WHITE, color, weight);
  }

  static Shade(color, weight) {
    return Color.Mix(Color.BLACK, color, weight);
  }

  constructor(channels, alpha, encoding) {
    Assert.IfNotThrow(channels, 'channels can not be null');
    Assert.IfNotThrow(encoding, 'encoding can not be null');

    this._channels = channels;
    this._alpha = alpha;
    this._encoding = encoding;
  }

  get rgb() {
    return this.convert(ColorEncoding.RGB);
  }

  get hsl() {
    return this.convert(ColorEncoding.HSL);
  }

  get hwb() {
    return this.convert(ColorEncoding.HWB);
  }

  get luminosity() {
    const rgb = this.rgb._channels;

    const lum = [];
    for (const [i, element] of rgb.entries()) {
      const chan = element / 255;
      lum[i] = chan <= 0.039_28 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
    }

    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  }

  get isDark() {
    return this.luminosity < 0.5;
  }

  get isLight() {
    return !this.isDark;
  }

  get isYiqDark() {
    const rgb = this.rgb._channels;
    const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return yiq < 128;
  }

  get isYiqLight() {
    return !this.isYiqDark;
  }

  alpha(value) {
    if (!value) {
      return this._alpha;
    } else {
      return new Color(this._channels, MathExtension.Clamp(value), this._encoding);
    }
  }

  red(value) {
    return this.getChannelAccessor(ColorEncoding.RGB, 0, this.getClampModifier(255))(value);
  }

  green(value) {
    return this.getChannelAccessor(ColorEncoding.RGB, 1, this.getClampModifier(255))(value);
  }

  blue(value) {
    return this.getChannelAccessor(ColorEncoding.RGB, 2, this.getClampModifier(255))(value);
  }

  hue(value) {
    return this.getChannelAccessor(ColorEncoding.HSL, 0, value => ((value % 360) + 360) % 360)(value);
  }

  saturationHSL(value) {
    return this.getChannelAccessor(ColorEncoding.HSL, 1, this.getClampModifier(100))(value);
  }

  ligthness(value) {
    return this.getChannelAccessor(ColorEncoding.HSL, 2, this.getClampModifier(100))(value);
  }

  white(value) {
    return this.getChannelAccessor(ColorEncoding.HWB, 1, this.getClampModifier(100))(value);
  }

  blackHWB(value) {
    return this.getChannelAccessor(ColorEncoding.HWB, 2, this.getClampModifier(100))(value);
  }

  negate() {
    const rgb = this.rgb;

    for (let i = 0; i < 3; i++) {
      rgb._channels[i] = 255 - rgb._channels[i];
    }

    return rgb;
  }

  lighten(ratio) {
    const hsl = this.hsl;
    hsl._channels[2] += hsl._channels[2] * ratio;
    return hsl;
  }

  darken(ratio) {
    const hsl = this.hsl;
    hsl._channels[2] -= hsl._channels[2] * ratio;
    return hsl;
  }

  saturate(ratio) {
    const hsl = this.hsl;
    hsl._channels[1] += hsl._channels[1] * ratio;
    return hsl;
  }

  desaturate(ratio) {
    const hsl = this.hsl;
    hsl._channels[1] -= hsl._channels[1] * ratio;
    return hsl;
  }

  whiten(ratio) {
    const hwb = this.hwb;
    hwb._channels[1] += hwb._channels[1] * ratio;
    return hwb;
  }

  blacken(ratio) {
    const hwb = this.hwb;
    hwb._channels[2] += hwb._channels[2] * ratio;
    return hwb;
  }

  fade(ratio) {
    return this.alpha(this._alpha - this._alpha * ratio);
  }

  opaquer(ratio) {
    return this.alpha(this._alpha + this._alpha * ratio);
  }

  rotate(degrees) {
    const hsl = this.hsl;
    let hue = hsl._channels[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    hsl._channels[0] = hue;
    return hsl;
  }

  mix(mixinColor, weight) {
    return Color.Mix(mixinColor, this, weight);
  }

  convert(encoding) {
    if (this._encoding.equals(encoding)) {
      return this;
    }
    const channels = Color.CONVERT_ENGINE.convert(this._channels, this._encoding, encoding);
    return new Color(channels, this._alpha, encoding);
  }

  toString() {
    return Color.SERIALIZER_ENGINE.serialize([...this._channels, this._alpha], this._encoding);
  }

  getChannelAccessor(encoding, channelIndex, modifier) {
    return value => {
      const color = this.convert(encoding);
      if (!value) {
        return color._channels[channelIndex];
      } else {
        const val = modifier ? modifier(value) : value;
        color._channels[channelIndex] = val;
        return color;
      }
    };
  }

  getClampModifier(max, min = 0) {
    return value => MathExtension.Clamp(value, min, max);
  }
}
