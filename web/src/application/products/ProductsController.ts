import { Request, Response } from "express";
import { ProductsRepository } from "./ProductsRepository";
import { ProductsSerializer } from "./ProductsSerializer";

export class ProductsController {

  constructor(private serializer: ProductsSerializer) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const repository: ProductsRepository = res.locals.repository;
      const products = await repository.getAllProducts()
      const serializedProducts = this.serializer.serializeProducts(products)
      res.status(200).json(serializedProducts);
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  getById = async (req: Request, {status, locals}: Response) => {
    try {
      const repository: ProductsRepository = locals.repository;
      const { productId } = req.params;
      const product = await repository.getProductById(productId);
      if(product) {
        const serializedProduct = this.serializer.serializeProduct(product)
        serializedProduct ? status(200).json(serializedProduct) : status(404).end();
      } else {
        status(404).end();
      }
    } catch ({message}) {
      status(500).json({errors: [{ msg: message}]});
    }
  }

  create = async (req: Request, {status, locals}: Response) => {
    try {
      const repository: ProductsRepository = locals.repository;
      const {name, description} = req.body;
      await repository.createProduct(name, description);
      status(201).end();
    } catch ({message}) {
      status(500).json({errors: [{ msg: message}]});
    }
  }

  update = async (req: Request, {status, locals}: Response) => {
    try {
      const repository: ProductsRepository = locals.repository;
      const { productId } = req.params;
      const { name, description } = req.body;
      const product = await repository.getProductById(productId);
      if(product) {
        await repository.updateProduct(product, name, description);
        status(204).end();
      } else {
        status(404).end();
      }
    } catch ({message}) {
      status(500).json({errors: [{ msg: message}]});
    }
  }

  delete = async (req: Request, {status, locals}: Response) => {
    try {
      const repository: ProductsRepository = locals.repository;
      const {productId} = req.params;
      const productToDelete = await repository.getProductById(productId);
      if(productToDelete) {
        await repository.deleteProduct(productToDelete);
        status(410).end();
      } else {
        status(404).end();
      }
    } catch ({message}) {
      status(500).json({errors: [{ msg: message}]});
    }
  }
}