import { Request, Response } from "express";
import { Product, ISerializer } from "../../core";

export class ProductsController {

  constructor(private serializer: ISerializer<Array<Product>>) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const products = [
        {
          id: "1",
          sku: "AB-100",
          name: "test"
        }
      ];
      const serializedProducts = this.serializer.create(products)
      res.send(serializedProducts);
    } catch ({message}) {
      res.send(message);
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      res.send({name: "test", id: productId})
    } catch ({message}) {
      res.send(message);
    }
  }
}