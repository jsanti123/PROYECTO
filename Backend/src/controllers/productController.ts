import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { StatusCodes } from 'http-status-codes';

export class ProductController {
    public static async createProduct(req: Request, res: Response) {  
        const response = await ProductService.create(req, res, req.body);
        res.status(response.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    public static async getProductById(req: Request, res: Response) {
        const product_id = req.params.id;
        const response = await ProductService.getById(product_id);
        res.status(response.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    public static async getAllProducts(req: Request, res: Response) {
        const response = await ProductService.getAll();
        res.status(response.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    public static updateProduct(req: Request, res: Response) {
    }
    public static deleteProduct(req: Request, res: Response) {
    }
}