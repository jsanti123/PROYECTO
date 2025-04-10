export class StockByWarehouse {
    public static async createStockByWarehouse(tx: any, productId: string, warehouseId: string, stock: number) {
        await tx.stockByWarehouse.create({
            data: {
                product_id: productId,
                warehouse_id: warehouseId,
                stock: stock
            }
        });
    }
}