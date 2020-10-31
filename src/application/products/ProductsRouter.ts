import {Router} from "express";
import { ProductsController } from "./ProductsController";

export const ProductsRouter = Router();

ProductsRouter.get("/", ProductsController.getAll);
ProductsRouter.get("/:productId", ProductsController.getById);
