import { db } from "../config/db";
import { createIdUtil } from '../utils/share/createIdUtil';
import { validateRelation } from "../utils/share/validateRelationUtil";
import { InventoryService } from "../services/inventoryService";

export class Product {
    public static async createProduct(productData: any) {
        return await db.$transaction(async (tx) => {
            const productId = await createIdUtil('product');
            await Promise.all([
                validateRelation(tx, 'category', 'id', productData.category_id, "La categoría no existe"),
                validateRelation(tx, 'supplier', 'id', productData.supplier_id, "El proveedor no existe"),
                validateRelation(tx, 'warehouse', 'id', productData.warehouse_id, "El almacén no existe")
            ]);
            const product = await tx.product.create({
                data: {
                    id: productId,
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                    category_id: productData.category_id,
                    supplier_id: productData.supplier_id
                }
            });
            await InventoryService.initializeInventory(tx, productId, productData);
            return product;
        });
    }
    public static async getProductById(id: string) {
        return await db.product.findUnique({
            where: {
                id
            }
        });
    }
    public static async getAllProducts() {
        return await db.product.findMany();
    }
}


