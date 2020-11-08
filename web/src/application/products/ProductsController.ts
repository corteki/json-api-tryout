import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../../core/products";
import { ProductsSerializer } from "./ProductsSerializer";

export class ProductsController {

  constructor(private serializer: ProductsSerializer) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const productsRepository = getRepository(Product);
      const products = await productsRepository.find()
      const serializedProducts = this.serializer.serializeProducts(products)
      res.send(serializedProducts);
      res.end();
    } catch ({message}) {
      res.send(message);
      res.end();
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const productsRepository = getRepository(Product);
      const product = await productsRepository.findOne(productId);
      if(product) {
        const serializedProduct = this.serializer.serializeProduct(product)
        serializedProduct ? res.send(serializedProduct) : res.status(404);
      } else {
        res.status(404)
      }
      res.end();
    } catch ({message}) {
      res.send(message);
      res.end();
    }
  }

  add = async (req: Request, res: Response) => {
    try {
      const {name, sku} = req.body;
      
      const productsRepository = getRepository(Product);
      console.log(name);
      console.log(sku);
      
      
      if(name && sku) {
        const product = productsRepository.create({name, sku});
        const result = await productsRepository.save(product);
        result ? res.status(201) : res.status(500);
      } else {
        res.status(400);
      }
      res.end();
    } catch ({message}) {
      res.send(message);
      res.end();
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const {productId} = req.params;
      const productsRepository = getRepository(Product);
      const productToDelete = await productsRepository.findOne(productId);
      if(productToDelete) {
        const result = await productsRepository.remove(productToDelete);
        console.log(productToDelete)
        result && res.status(410);
      } else {
        res.status(404);
      }
      res.end();
    } catch ({message}) {
      res.send(message);
      res.end;
    }
  }
}