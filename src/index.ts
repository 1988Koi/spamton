import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./swagger";
import { AppDataSource } from "./data-source";
import { Product } from "./entities/Product";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// serve static frontend demo (single file)
app.use("/", express.static(path.join(__dirname, "public")));

// Swagger
setupSwagger(app);

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT || 4000);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    // --- Seed demo products ---
    const productRepo = AppDataSource.getRepository(Product);
    const productCount = await productRepo.count();
    if (productCount === 0) {
      await productRepo.save([
        { name: "Produto Demo 1", description: "Descrição 1", price: 10.5, stock: 10 },
        { name: "Produto Demo 2", description: "Descrição 2", price: 29.99, stock: 5 }
      ]);
      console.log("Seeded demo products");
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api/docs`);
      console.log(`Frontend demo: http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error("Error during Data Source initialization:", err);
  });
