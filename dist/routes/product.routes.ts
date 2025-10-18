import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "8e239250-2238-4eb3-969a-1e4fb437b786"
 *                   name:
 *                     type: string
 *                     example: "Produto Demo 1"
 *                   description:
 *                     type: string
 *                     example: "Descrição do produto demo"
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   stock:
 *                     type: integer
 *                     example: 10
 */
router.get("/", getAllProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "8e239250-2238-4eb3-969a-1e4fb437b786"
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "8e239250-2238-4eb3-969a-1e4fb437b786"
 *                 name:
 *                   type: string
 *                   example: "Produto Demo 1"
 *                 description:
 *                   type: string
 *                   example: "Descrição do produto demo"
 *                 price:
 *                   type: number
 *                   example: 19.99
 *                 stock:
 *                   type: integer
 *                   example: 10
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @openapi
 * /api/products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new product (protected)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo Produto"
 *               description:
 *                 type: string
 *                 example: "Descrição do novo produto"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", authenticateJWT, createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a product by ID (protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "8e239250-2238-4eb3-969a-1e4fb437b786"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Produto Atualizado"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada do produto"
 *               price:
 *                 type: number
 *                 example: 39.99
 *               stock:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/:id", authenticateJWT, updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product by ID (protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "8e239250-2238-4eb3-969a-1e4fb437b786"
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authenticateJWT, deleteProduct);

export default router;
