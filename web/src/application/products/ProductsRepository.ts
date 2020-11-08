import { EntityManager, EntityRepository } from "typeorm";
import { Product } from "./models/Product";

@EntityRepository()
export class ProductsRepository {

  constructor(private manager: EntityManager) {}

  getAllProducts() {
    return this.manager.find(Product);
  }

  getProductById(productId: string) {
    return this.manager.findOne(Product, productId);
  }

  createProduct(name: string, sku: string) {
    const product = new Product();
    product.name = name;
    product.sku = sku;
    return this.manager.save(product);
  }

  updateProduct(product: Product, name: string, sku: string) {
      const updatedProduct = new Product();
      updatedProduct.id = product.id;
      updatedProduct.name = name ? name : product.name;
      updatedProduct.sku = sku ? sku : product.sku;
      return this.manager.update(Product, product.id, updatedProduct);
  }

  deleteProduct(product: Product) {
    return this.manager.remove(product);
  }

}
