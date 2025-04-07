import { Request, Response } from 'express';
import ResponseModel from '../utils/share/responseModel';
import { ProductService } from '../services/productService';
import { createIdUtil } from '../utils/share/createIdUtil';

export class ProductController {
    public static async createProduct(req: Request, res: Response) {  
        try {
            const product_id = await createIdUtil('product');
            req.body.id = product_id;
            await ProductService.create(req.body);
            res.status(200).json(ResponseModel.successResponse("Product created successfully", req.body));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
    public static getProductById(req: Request, res: Response) {
    }
    public static getProduct(req: Request, res: Response) {
    }
    public static getAllProducts(req: Request, res: Response) {
    }
    public static updateProduct(req: Request, res: Response) {
    }
    public static deleteProduct(req: Request, res: Response) {
    }
}