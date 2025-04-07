import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validations, validationProduct } from "../utils/validators/productValidator";

const productRouter = Router();

productRouter.post("/product", validations, validationProduct, ProductController.createProduct);
productRouter.get("/product/:id", ProductController.getProduct);
productRouter.get("/products", ProductController.getAllProducts);
productRouter.put("/product/:id", ProductController.updateProduct);
productRouter.delete("/product/:id", ProductController.deleteProduct);

export default productRouter;