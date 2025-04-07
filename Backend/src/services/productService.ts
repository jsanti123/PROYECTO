import { Product } from '../models/Product';
import { Prisma } from '@prisma/client';

export class ProductService {
    public static async create(data: Prisma.ProductCreateInput) {
        if (!data.description) {
            data.description = null;
        }
        return await Product.createProduct(data);
    }
}