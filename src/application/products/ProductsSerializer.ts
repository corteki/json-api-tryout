import { Serializer } from "jsonapi-serializer";
import { Product, ISerializer, Serialized } from "../../core";

export class ProductsSerializer extends Serializer implements ISerializer<Array<Product>> {

  constructor() {
    super('products', {
      attributes: ["sku"]
    });
  }

  create(products: Array<Product>): Serialized<Array<Product>> {
    return this.serialize(products);
  }
}
