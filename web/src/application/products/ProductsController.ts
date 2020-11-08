import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../../core/products";
import { ProductsSerializer } from "./ProductsSerializer";
import { validationResult } from "express-validator";

export class ProductsController {

  constructor(private serializer: ProductsSerializer) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const productsRepository = getRepository(Product);
      const products = await productsRepository.find()
      const serializedProducts = this.serializer.serializeProducts(products)
      return res.status(200).json(serializedProducts);
    } catch ({message}) {
      return res.status(500).json({errors: [{ msg: message}]});
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const productsRepository = getRepository(Product);
      const product = await productsRepository.findOne(productId);
      if(product) {
        const serializedProduct = this.serializer.serializeProduct(product)
        return serializedProduct ? res.status(200).json(serializedProduct) : res.status(404);
      } 
      return res.status(404);
    } catch ({message}) {
      return res.status(500).json({errors: [{ msg: message}]});
    }
  }

  add = async (req: Request, res: Response) => {
    try {
      const {name, sku} = req.body;
      const productsRepository = getRepository(Product);
      const product = productsRepository.create({name, sku});
      const result = await productsRepository.save(product);
      return result ? res.status(201) : res.status(500);
    } catch ({message}) {
      return res.status(500).json({errors: [{ msg: message}]});
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const {productId} = req.params;
      const productsRepository = getRepository(Product);
      const productToDelete = await productsRepository.findOne(productId);
      if(productToDelete) {
        await productsRepository.remove(productToDelete);
        return res.status(410)
      } 
      return res.status(404);
    } catch ({message}) {
      return res.status(500).json({errors: [{ msg: message}]});
    }
  }
}