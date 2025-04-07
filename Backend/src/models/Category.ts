import { db } from "../config/db";
import { Prisma } from "@prisma/client";

export class Category {
    public static async createCategory(data: Prisma.CategoryCreateInput) {
        return await db.category.create({
            data
        });
    }
}