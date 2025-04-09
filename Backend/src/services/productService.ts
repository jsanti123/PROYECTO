import ResponseModel from '../utils/share/responseUtil';
import { RESPONSE_CODES } from '../utils/share/responseCodes';
import { Product } from '../models/Product';
import { Prisma } from '@prisma/client';
import { StatusCodes } from "http-status-codes";
import { Response, Request } from 'express';

export class ProductService {
    public static async create(req: Request, res: Response, data: Prisma.ProductCreateInput) {
        try {
            if (!data.description) data.description = null;
            const product = await Product.createProduct(data);
            return ResponseModel.successResponse(
                "Product created successfully",
                product,
              );
        } catch (error) {
            if(error instanceof Error) {
                const notFoundMessages = [
                    "La categoría no existe",
                    "El proveedor no existe",
                    "El almacén no existe"
                ];
                if (notFoundMessages.includes(error.message)) {
                    return ResponseModel.errorResponse(
                        error.message,
                        null,
                        StatusCodes.NOT_FOUND,
                        RESPONSE_CODES.NOT_FOUND,
                    );
                }
            }
            return ResponseModel.errorResponse(
                "Error creating product",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public static async getById(id: string) {
        try {
            const product = await Product.getProductById(id);
            if (!product) {
                return ResponseModel.errorResponse(
                    "Product not found",
                    null,
                    StatusCodes.NOT_FOUND,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Product retrieved successfully",
                product,
            );
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error retrieving product",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        } 
    }
    public static async getAll() {
        try {
            const products = await Product.getAllProducts();
            if (!products || products.length === 0) {
                return ResponseModel.errorResponse(
                    "No products found",
                    null,
                    StatusCodes.NOT_FOUND,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Products retrieved successfully",
                products,
            );
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error retrieving products",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
}