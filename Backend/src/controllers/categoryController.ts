import ResponseModel from "../utils/share/responseUtil";
import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import { createIdUtil } from "../utils/share/createIdUtil";
import { RESPONSE_CODES } from "../utils/share/responseCodes";
import { StatusCodes } from "http-status-codes";

export class CategoryController {
    public static async createCategory(req: Request, res: Response) {
        try {
            const category_id = await createIdUtil('category');
            req.body.id = category_id;
            await CategoryService.create(req.body);
            res.status(StatusCodes.OK).json(ResponseModel.successResponse(
                "Category created successfully",
                 req.body
                ));
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseModel.errorResponse(
                "Error creating category",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            ));
        }
    }
    public static getCategoryById(req: Request, res: Response) {
    }
    public static getAllCategories(req: Request, res: Response) {
    }
    public static updateCategory(req: Request, res: Response) {
    }
    public static deleteCategory(req: Request, res: Response) {
    }
}