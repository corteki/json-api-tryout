import { Router } from "express";
import { ProductsRouter } from "./products/ProductsRouter";

export const Api = Router();

Api.use("/products", ProductsRouter);
