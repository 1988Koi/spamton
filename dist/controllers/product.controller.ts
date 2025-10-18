import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

const repo = AppDataSource.getRepository(Product);

// GET /products
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await repo.find();
  res.json(products);
};

// GET /products/:id
export const getProductById = async (req: Request, res: Response) => {
  const product = await repo.findOneBy({ id: req.params.id }); // <-- string direto
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  const product = repo.create(req.body);
  await repo.save(product);
  res.status(201).json(product);
};

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const product = await repo.findOneBy({ id: req.params.id }); // string direto
  if (!product) return res.status(404).json({ message: "Product not found" });

  repo.merge(product, req.body);
  await repo.save(product);
  res.json(product);
};

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await repo.findOneBy({ id: req.params.id }); // string direto
  if (!product) return res.status(404).json({ message: "Product not found" });

  await repo.remove(product);
  res.json({ message: "Product deleted" });
};
