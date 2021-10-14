export class SerializerBase {
  get encoding() {}

  canSerialize(encoding) {
    return this.encoding.equals(encoding);
  }

  serialize(colorArray) {}
}
