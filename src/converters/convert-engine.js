import { Assert } from '../../assert';
import { RGB_HEX_Converter } from './rgb-hex';
import { RGB_HSL_Converter } from './rgb-hsl';
import { RGB_HWB_Converter } from './rgb-hwb';

export class ColorConvertEngine {
  static DEFAULT = this.Create();

  static Create() {
    const converters = [RGB_HSL_Converter.DEFAULT, RGB_HWB_Converter.DEFAULT, RGB_HEX_Converter.DEFAULT];
    return new ColorConvertEngine(converters);
  }

  constructor(converters) {
    this.converters = converters;
  }

  convert(color, srcEnconding, desEncoding) {
    const converter = this.getConverter(srcEnconding, desEncoding);
    if (converter.canConvert(srcEnconding, desEncoding)) {
      return converter.convert(color);
    } else {
      return converter.reverse(color);
    }
  }

  getConverter(srcEncoding, desEnconding) {
    for (const converter of this.converters) {
      if (converter.canConvert(srcEncoding, desEnconding) || converter.canReverse(srcEncoding, desEnconding)) {
        return converter;
      }
    }
    Assert.Throw(`can not convert color encoding from  ${srcEncoding.name} to ${desEnconding.name}`, 'ColorConvertEngine');
  }

  addConverter(converter) {
    this.converters.push(converter);
  }
}
