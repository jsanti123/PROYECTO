import { db } from "../../config/db"

export async function createIdUtil(table: string) {
    switch (table) {
        case 'product':
            const lastProduct = await db.product.findFirst({
                orderBy: { id: 'desc' },
                select: { id: true }
            });
            let nextIdNumber = 1;
            if (lastProduct && lastProduct.id) {
                const numericPart = parseInt(lastProduct.id.replace('P', ''), 10);
                nextIdNumber = numericPart + 1;
            }
            const paddedNumber = String(nextIdNumber).padStart(4, '0');
            return `P${paddedNumber}`;
        case 'category':
            const lastCategory = await db.category.findFirst({
                orderBy: { id: 'desc' },
                select: { id: true }
            });
            let nextCategoryIdNumber = 1;
            if (lastCategory && lastCategory.id) {
                const numericPart = parseInt(lastCategory.id.replace('C', ''), 10);
                nextCategoryIdNumber = numericPart + 1;
            }
            const paddedCategoryNumber = String(nextCategoryIdNumber).padStart(4, '0');
            return `C${paddedCategoryNumber}`;
        default:
            throw new Error(`Unknown table: ${table}`);
    }
}