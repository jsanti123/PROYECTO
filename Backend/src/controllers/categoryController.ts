import { Request, Response } from "express";
import ResponseModel from "../utils/share/responseUtil";
import { CategoryService } from "../services/categoryService";
import { createIdUtil } from "../utils/share/createIdUtil";

export class CategoryController {
    public static async createCategory(req: Request, res: Response) {
        try {
            const category_id = await createIdUtil('category');
            req.body.id = category_id;
            await CategoryService.create(req.body);
            res.status(200).json(ResponseModel.successResponse("Category created successfully", req.body));
        } catch (error) {
            res.status(500).json(ResponseModel.errorResponse("Error creating category", null, 500, "INTERNAL_SERVER_ERROR"));
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