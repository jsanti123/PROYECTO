import { Request, Response } from "express";
import { WarehouseService } from "../services/wareHouseService";

export class WarehouseController {
    public static async createWarehouse(req: Request, res: Response) {
        const response = await WarehouseService.create(req.body);
        res.status(response.statusCode).json(response);
    }
    public static async getWarehouseById(req: Request, res: Response) {
    }
    public static async getAllWarehouses(req: Request, res: Response) {
    }
    public static async updateWarehouse(req: Request, res: Response) {
    }
    public static async deleteWarehouse(req: Request, res: Response) {
    }
}