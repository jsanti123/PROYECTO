export class InventoryMovements {
    public static async createInventoryMovement(tx: any, productId: string, warehouseId: string, movementType: string, quantity: number, description: string) {
        await tx.inventoryMovements.create({
            data: {
                product_id: productId,
                warehouse_id: warehouseId,
                movement_type: movementType,
                quantity: quantity,
                description: description,
            }
        });
    }
}