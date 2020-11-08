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
      res.status(200).json(serializedProducts);
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const productsRepository = getRepository(Product);
      const product = await productsRepository.findOne(productId);
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

  add = async (req: Request, res: Response) => {
    try {
      const {name, sku} = req.body;
      const productsRepository = getRepository(Product);
      const product = productsRepository.create({name, sku});
      await productsRepository.save(product);
      res.status(201).end();
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { name, sku } = req.body;
      const productsRepository = getRepository(Product);
      const product = await productsRepository.findOne(productId);
      if(product) {
        const updatedProduct = new Product();
        updatedProduct.id = productId;
        updatedProduct.name = name ? name : product.name;
        updatedProduct.sku = sku ? sku : product.sku;
        !updatedProduct.isEqual(product) ? 
        await productsRepository.update(productId, updatedProduct) : 
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
      const {productId} = req.params;
      const productsRepository = getRepository(Product);
      const productToDelete = await productsRepository.findOne(productId);
      if(productToDelete) {
        await productsRepository.remove(productToDelete);
        res.status(410).end();
      } else {
        res.status(404).end();
      }
    } catch ({message}) {
      res.status(500).json({errors: [{ msg: message}]});
    }
  }
}