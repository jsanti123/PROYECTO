import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
    public static async createCategory(req: Request, res: Response) {
        const response = await CategoryService.create(req.body);
        res.status(response.statusCode).json(response);
    }
    public static async getCategoryById(req: Request, res: Response) {
        const categoryId = req.params.id;
        const response = await CategoryService.getById(categoryId);
        res.status(response.statusCode).json(response);
    }
    public static async getAllCategories(req: Request, res: Response) {
        const response = await CategoryService.getAll();
        res.status(response.statusCode).json(response);
    }
    public static async updateCategory(req: Request, res: Response) {
        const categoryId = req.params.id;
        const response = await CategoryService.update(categoryId, req.body);
        res.status(response.statusCode).json(response);
    }
    public static async deleteCategory(req: Request, res: Response) {
        const categoryId = req.params.id;
        const response = await CategoryService.delete(categoryId);
        res.status(response.statusCode).json(response); 
    }
}