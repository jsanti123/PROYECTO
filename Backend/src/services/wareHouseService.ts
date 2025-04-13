import { Prisma } from "@prisma/client";
import ResponseModel from '../utils/share/responseUtil';
import { Warehouse } from "../models/Warehouse";
import { RESPONSE_CODES } from '../utils/share/responseCodes';
import { StatusCodes } from "http-status-codes";

export  class WarehouseService {
    public static async create(data: Prisma.WarehouseCreateInput) {
        try {
            const warehouse = await Warehouse.createWarehouse(data);
            if (!warehouse) {
                return ResponseModel.errorResponse(
                    "Error creating warehouse",
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    null,
                    RESPONSE_CODES.INTERNAL_SERVER_ERROR,
                );
            }
            return ResponseModel.successResponse(
                "Warehouse created successfully",
                warehouse,
            )
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error creating warehouse",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
}