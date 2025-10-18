import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [Product, User],
});
