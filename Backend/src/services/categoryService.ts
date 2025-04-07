import { Category } from "../models/Category";
import { Prisma } from "@prisma/client";

export class CategoryService {
    public static async create(data: Prisma.CategoryCreateInput) {
        if (!data.description) {
            data.description = null;
        }
        return await Category.createCategory(data);
    }
}