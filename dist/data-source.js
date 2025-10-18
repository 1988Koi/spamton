"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("./entities/Product");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product, User_1.User],
});
