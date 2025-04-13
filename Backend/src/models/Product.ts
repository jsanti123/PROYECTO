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
                id,
                deleted: false
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                stockByWarehouse: {
                    select: {
                        stock: true,
                        warehouse: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        if (!product) {
            return null;
        }
        return product;
    }
    
    public static async getAllProducts() {
        const products = await db.product.findMany({
            where: {
                deleted: false
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                stockByWarehouse: {
                    select: {
                        stock: true,
                        warehouse: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return products;
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
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    stock: true,
                    description: true,
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    supplier: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return updatedProduct;
        });
    }
    public static async deleteProduct(id: string) {
        const product = await db.product.update({
            where: { id },
            data: {
                deleted: true
            },
            select: {
                id: true,
                name: true,
                supplier: {
                    select: {
                        name: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                },
            },
        });
        return product;
    }
}


