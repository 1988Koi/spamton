import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

const isAzure = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource(
  isAzure
    ? {
        type: "sqlite",
        database: "dist/database.sqlite",
        synchronize: true,
        logging: false,
        entities: [Product, User],
      }
    : {
        type: "sqlite",
        database: "src/dev.sqlite",
        synchronize: true,
        logging: true,
        entities: [Product, User],
      }
);
