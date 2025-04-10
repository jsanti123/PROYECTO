export class StockHistory {
    public static async createStockHistory(tx: any, productId: string, warehouseId: string, previousStock: number, newStock: number) {
        await tx.stockHistory.create({
            data: {
                product_id: productId,
                warehouse_id: warehouseId,
                previous_stock: previousStock,
                new_stock: newStock,
            }
        });
    }
}