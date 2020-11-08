import { body } from "express-validator";
import { DataManager } from "../shared/DataManager";

export class ProductsValidation {

  private static readonly MINIMUM_SKU_LENGTH = 4;
  private static readonly MINIMUM_NAME_LENGTH = 4;
  private static readonly MAXIMUM_NAME_LENGTH = 64;
  private static readonly INVALID_SKU_MESSAGE = "Must be atleast 4 characters long";
  private static readonly INVALID_NAME_MESSAGE = "Must be atleast 4 and at most 64 characters long";
  
  static verifyPostedData() {
    return DataManager.validate([
      body("sku").isLength({
        min: ProductsValidation.MINIMUM_SKU_LENGTH
      })
      .withMessage(ProductsValidation.INVALID_SKU_MESSAGE),
      body("name").isLength({
        min:  ProductsValidation.MINIMUM_NAME_LENGTH,
        max: ProductsValidation.MAXIMUM_NAME_LENGTH
      })
      .withMessage(ProductsValidation.INVALID_NAME_MESSAGE)
    ]);
  }
  
}
