import { db } from "../config/db";
import { createIdUtil } from '../utils/share/createIdUtil';

export class Category {
    public static async createCategory(categoryData: any) {
        return await db.$transaction(async (tx) => {
            const categoryId = await createIdUtil('category');
            const category = await tx.category.create({
                data: {
                    id: categoryId,
                    name: categoryData.name,
                    description: categoryData.description
                }
            });
            return category;
        });
    }
    public static async getCategoryById(id: string) {
        const category = await db.category.findUnique({
            where: {
                id,
                deleted: false
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });
        if (!category) {
            return null;
        }
        return category;
    }
    public static async getAllCategories() {
        const categories = await db.category.findMany({
            where: {
                deleted: false
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        })
        if (!categories) {
            return null;
        }
        return categories;
    }
    public static async updateCategory(id: string, categoryData: any) {
        return await db.$transaction(async (tx) => {
            const updateData: any = {
                name: categoryData.name,
            };
            if (categoryData.description !== null) {
                updateData.description = categoryData.description;
            }
            const updateCategory = await tx.category.update({
                where: {
                    id
                },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            });
            return updateCategory;
        });
    }
    public static async deleteCategory(id: string) {
        const category = await db.category.update({
            where: { id },
            data: {
                deleted: true,
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });
        return category;
    }
}