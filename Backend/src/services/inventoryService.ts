import { StockHistory } from "../models/StockHistory";
import { InventoryMovements } from "../models/InventoryMovements";
import { StockByWarehouse } from "../models/StockByWarehouse";

export class InventoryService {
    public static async initializeInventory(tx: any, productId: string, data: any) {
        await Promise.all([
            StockHistory.createStockHistory(tx, productId, data.warehouse_id, 0, data.stock),
            InventoryMovements.createInventoryMovement(tx, productId, data.warehouse_id, 'ENTRADA', data.stock, 'Stock inicial'),
            StockByWarehouse.createStockByWarehouse(tx, productId, data.warehouse_id, data.stock)
        ]);
    }
}