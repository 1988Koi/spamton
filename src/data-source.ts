import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

const isAzure = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource(
  isAzure
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        logging: false,
        entities: [Product, User],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST || "store-postgres",
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_DATABASE || "storedb",
        synchronize: true,
        logging: true,
        entities: [Product, User],
        migrations: ["src/migrations/*.ts"],
        subscribers: [],
      }
);
