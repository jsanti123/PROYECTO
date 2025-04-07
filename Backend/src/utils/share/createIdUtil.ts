import { db } from "../../config/db"

export async function createIdUtil(table: string) {
    if (table === 'product') {
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
    }
    return null;
}