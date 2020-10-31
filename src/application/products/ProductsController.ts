import { Request, Response } from "express";

export class ProductsController {
  static async getAll(req: Request, res: Response) {
    try {
      res.send({
        products: [
          {
            name: "test"
          }
        ]
      })
    } catch ({message}) {
      res.send(message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      res.send({name: "test", id: productId})
    } catch ({message}) {
      res.send(message);
    }
  }
}