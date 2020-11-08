import { Router } from "express";
import { ProductsRepositoryFactory } from "./ProductsRepositoryFactory";
import { ProductsController } from "./ProductsController";
import { ProductsSerializer } from "./ProductsSerializer";
import { ProductsValidation } from "./ProductsValidation";

export const ProductsRouter = Router();

const productsSerializer = new ProductsSerializer();
const productsController = new ProductsController(productsSerializer);

ProductsRouter.get(
  "/", 
  ProductsRepositoryFactory.create, 
  productsController.getAll
);

ProductsRouter.post(
  "/", 
  ProductsRepositoryFactory.create, 
  ProductsValidation.verifyPostedData(), 
  productsController.create
);

ProductsRouter.get(
  "/:productId", 
  ProductsRepositoryFactory.create, 
  productsController.getById
);

ProductsRouter.put(
  "/:productId", 
  ProductsRepositoryFactory.create, 
  ProductsValidation.verifyUpdatedData(), 
  productsController.update
);

ProductsRouter.delete(
  "/:productId", 
  ProductsRepositoryFactory.create, 
  productsController.delete
);
