import { db } from "../config/db";
import { Prisma } from "@prisma/client";

export class Product {
    public static async createProduct(data: Prisma.ProductCreateInput) {
        return await db.product.create({
            data
        });
    }
}


