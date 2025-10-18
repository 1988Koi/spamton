"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct1680000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateProduct1680000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "stock",
                    type: "int",
                    default: 0,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product");
    }
}
exports.CreateProduct1680000000000 = CreateProduct1680000000000;
