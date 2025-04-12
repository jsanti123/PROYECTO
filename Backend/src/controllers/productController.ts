import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
    public static async createProduct(req: Request, res: Response) {  
        const response = await ProductService.create(req.body);
        res.status(response.statusCode).json(response);
    }
    public static async getProductById(req: Request, res: Response) {
        const product_id = req.params.id;
        const response = await ProductService.getById(product_id);
        res.status(response.statusCode).json(response);
    }
    public static async getAllProducts(req: Request, res: Response) {
        const response = await ProductService.getAll();
        res.status(response.statusCode).json(response);
    }
    public static async updateProduct(req: Request, res: Response) {
        const response = await ProductService.update(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }
    public static async deleteProduct(req: Request, res: Response) {
        const response = await ProductService.delete(req.params.id);
        res.status(response.statusCode).json(response);
    }
}