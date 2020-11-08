import {Router} from "express";
import { ProductsController } from "./ProductsController";
import { ProductsSerializer } from "./ProductsSerializer";

export const ProductsRouter = Router();


const productsSerializer = new ProductsSerializer();
const productsController = new ProductsController(productsSerializer);

ProductsRouter.get("/", productsController.getAll);
ProductsRouter.post("/", productsController.add);
ProductsRouter.get("/:productId", productsController.getById);
ProductsRouter.delete("/:productId", productsController.delete);
