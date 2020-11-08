import {Router} from "express";
import { ProductsController } from "./ProductsController";
import { ProductsSerializer } from "./ProductsSerializer";
import { body } from "express-validator";

export const ProductsRouter = Router();


const productsSerializer = new ProductsSerializer();
const productsController = new ProductsController(productsSerializer);

ProductsRouter.get("/", productsController.getAll);
ProductsRouter.post("/", [
  body("sku").isLength({min: 4}).withMessage("Must be atleast 4 characters long"),
  body("name").isLength({min: 4, max: 64}).withMessage("Must be atleast 4 and at most 64 characters long")
], productsController.add);
ProductsRouter.get("/:productId", productsController.getById);
ProductsRouter.delete("/:productId", productsController.delete);
