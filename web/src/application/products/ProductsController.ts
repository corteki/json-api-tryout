import { Request, Response } from "express";
import { ProductsRepository } from "./ProductsRepository";
import { ProductsSerializer } from "./ProductsSerializer";

export class ProductsController {

  constructor(private serializer: ProductsSerializer) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const { repository } = res.locals;
      const products = await (<ProductsRepository>repository).getAllProducts()
      const serializedProducts = this.serializer.serializeProducts(products)
      res.status(200).json(serializedProducts);
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { repository } = res.locals;
      const { productId } = req.params;
      const product = await (<ProductsRepository>repository).getProductById(productId);
      if(product) {
        const serializedProduct = this.serializer.serializeProduct(product)
        serializedProduct ? res.status(200).json(serializedProduct) : res.status(404).end();
      } else {
        res.status(404).end();
      }
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const { repository } = res.locals;
      const {name, sku} = req.body;
      await (<ProductsRepository>repository).createProduct(name, sku);
      res.status(201).end();
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { repository } = res.locals;
      const { productId } = req.params;
      const { name, sku } = req.body;
      const product = await (<ProductsRepository>repository).getProductById(productId);
      if(product) {
        await (<ProductsRepository>repository).updateProduct(product, name, sku);
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { repository } = res.locals;
      const {productId} = req.params;
      const productToDelete = await (<ProductsRepository>repository).getProductById(productId);
      if(productToDelete) {
        await (<ProductsRepository>repository).deleteProduct(productToDelete);
        res.status(410).end();
      } else {
        res.status(404).end();
      }
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }
}