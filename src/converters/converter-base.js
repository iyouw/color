export class ColorConverterBase {
  constructor(srcEncoding, desEncoding) {
    this.srcEncoding = srcEncoding;
    this.desEncoding = desEncoding;
  }

  get name() {
    return `${this.srcEncoding.name}__${this.desEncoding.name}`;
  }

  canConvert(srcEncoding, desEncoding) {
    return this.srcEncoding.equals(srcEncoding) && this.desEncoding.equals(desEncoding);
  }

  canReverse(srcEncoding, desEncoding) {
    return this.srcEncoding.equals(desEncoding) && this.desEncoding.equals(srcEncoding);
  }

  // convert src encoding to des encoding
  convert(channels) {}

  // convert des encoding to src encoding
  reverse(channels) {}

  comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
}
