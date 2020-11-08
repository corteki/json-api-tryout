import { Serializer } from "jsonapi-serializer";
import { Serialized } from "../../core";
import { Product } from "./models/Product";

export class ProductsSerializer extends Serializer {

  constructor() {
    super('products', {
      attributes: ["sku", "name"]
    });
  }

  serializeProducts(products: Array<Product>): Serialized<Array<Product>> {
    return this.serialize(products);
  }

  serializeProduct(product?: Product): Serialized<Product> {
    return this.serialize(product)
  }
}
