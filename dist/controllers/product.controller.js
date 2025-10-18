"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const data_source_1 = require("../data-source");
const Product_1 = require("../entities/Product");
const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
// GET /products
const getAllProducts = async (req, res) => {
    const products = await repo.find();
    res.json(products);
};
exports.getAllProducts = getAllProducts;
// GET /products/:id
const getProductById = async (req, res) => {
    const product = await repo.findOneBy({ id: req.params.id }); // <-- string direto
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    res.json(product);
};
exports.getProductById = getProductById;
// POST /products
const createProduct = async (req, res) => {
    const product = repo.create(req.body);
    await repo.save(product);
    res.status(201).json(product);
};
exports.createProduct = createProduct;
// PUT /products/:id
const updateProduct = async (req, res) => {
    const product = await repo.findOneBy({ id: req.params.id }); // string direto
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    repo.merge(product, req.body);
    await repo.save(product);
    res.json(product);
};
exports.updateProduct = updateProduct;
// DELETE /products/:id
const deleteProduct = async (req, res) => {
    const product = await repo.findOneBy({ id: req.params.id }); // string direto
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    await repo.remove(product);
    res.json({ message: "Product deleted" });
};
exports.deleteProduct = deleteProduct;
