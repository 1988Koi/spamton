"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const swagger_1 = require("./swagger");
const data_source_1 = require("./data-source");
const Product_1 = require("./entities/Product");
// === App ===
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// === Servir frontend estático ===
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// === Swagger ===
(0, swagger_1.setupSwagger)(app);
// === Rotas da API ===
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
// === Health check ===
app.get("/api/health", (_, res) => res.json({ ok: true }));
// === Rota fallback (SPA / frontend) ===
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
// === Porta ===
const PORT = Number(process.env.PORT || 4000);
// === Inicializar DB e start do servidor ===
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("✅ Database connected");
    // Seed demo products
    const productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
    const count = await productRepo.count();
    if (count === 0) {
        await productRepo.save([
            { name: "Produto Demo 1", description: "Descrição 1", price: 10.5, stock: 10 },
            { name: "Produto Demo 2", description: "Descrição 2", price: 29.99, stock: 5 },
        ]);
        console.log("🌱 Seeded demo products");
    }
    // Start server
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
        console.log(`📘 Swagger: http://localhost:${PORT}/api/docs`);
        console.log(`🖥️ Frontend: http://localhost:${PORT}/`);
    });
})
    .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
});
