import { db } from "../config/db";
import { createIdUtil } from "../utils/share/createIdUtil";

export class Warehouse {
    public static async createWarehouse(warehouseData: any) {
        return await db.$transaction(async (tx) => {
            const warehouseId = await createIdUtil('warehouse');
            const warehouse =await tx.warehouse.create({
                data: {
                    id: warehouseId,
                    name: warehouseData.name,
                    location: warehouseData.location,
                }
            });
            return warehouse;
        });
    }
}