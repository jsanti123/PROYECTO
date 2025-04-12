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
        const product = await db.product.findUnique({
            where: {
                id ,
                deleted: false
            },
            include: {
                category: true,
                supplier: true,
                stockByWarehouse: {
                    include: {
                        warehouse: true
                    }
                }
            }
        });
        if (!product) {
            return null;
        }
        return this.formatProduct(product);
    }
    public static async getAllProducts() {
        const data = await db.product.findMany({
            where: {
                deleted: false
            },
            include: {
                category: true,
                supplier: true,
                stockByWarehouse: {
                    include: {
                        warehouse: true
                    }
                }
            }
        });
        return data.map(this.formatProduct);
    }
    public static async updateProduct(id: string, productData: any) {
        return await db.$transaction(async (tx) => {
            const updateData: any = {
                name: productData.name,
                price: productData.price,
                stock: productData.stock,
                category_id: productData.category_id,
                supplier_id: productData.supplier_id
            };
    
            if (productData.description !== null) {
                updateData.description = productData.description;
            }
    
            const updatedProduct = await tx.product.update({
                where: { id },
                data: updateData
            });
    
            return updatedProduct;
        });
    }
    public static async deleteProduct(id: string) {
        const data = await db.product.update({
            where: { id },
            data: {
                deleted: true
            },
            include: {
                category: true,
                supplier: true,
                stockByWarehouse: {
                    include: {
                        warehouse: true
                    }
                }
            }
        });
        return this.formatProduct(data);
    }
    private static formatProduct(product: any) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: {
                id: product.category?.id,
                name: product.category?.name,
            },
            supplier: {
                id: product.supplier?.id,
                name: product.supplier?.name,
            },
            warehouses: product.stockByWarehouse?.map((sbw: any) => ({
                name: sbw.warehouse.name,
                stock: sbw.stock,
            })) ?? [],
        };
    }
  
}


