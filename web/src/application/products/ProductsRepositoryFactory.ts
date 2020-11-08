import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "./ProductsRepository";

export class ProductsRepositoryFactory {
  static create(req: Request, { locals }: Response, next: NextFunction) {
      locals.repository = getCustomRepository(ProductsRepository);
      return next();
  }
}