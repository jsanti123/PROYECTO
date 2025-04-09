import { db } from "../config/db";
import { createIdUtil } from '../utils/share/createIdUtil';

export class Product {
    public static async createProduct(productData: any) {
        return await db.$transaction(async (tx) => {
            const productId = await createIdUtil('product');
            const [category, supplier, warehouse] = await Promise.all([
                tx.category.findUnique({ where: { id: productData.category_id } }),
                tx.supplier.findUnique({ where: { id: productData.supplier_id } }),
                tx.warehouse.findUnique({ where: { id: productData.warehouse_id } }),
            ]);
            if (!category) throw new Error("La categoría no existe");
            if (!supplier) throw new Error("El proveedor no existe");
            if (!warehouse) throw new Error("El almacén no existe");
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
            await tx.stockHistory.create({
                data: {
                    product_id: productId,
                    warehouse_id: productData.warehouse_id,
                    previous_stock: 0,
                    new_stock: productData.stock,
                }
            
            });
            await tx.inventoryMovements.create({
                data: {
                    product_id: productId,
                    warehouse_id: productData.warehouse_id,
                    movement_type: 'ENTRADA',
                    quantity: productData.stock,
                    description: 'Ingreso producto'
                }
            });
            await tx.stockByWarehouse.create({
                data: {
                    product_id: productId,
                    warehouse_id: productData.warehouse_id,
                    stock: productData.stock
                }
            });
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


