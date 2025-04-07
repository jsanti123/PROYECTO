import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validationsProduct} from "../utils/validators/productValidator";
import { validateResult } from "../utils/share/validationUtil";

const productRouter = Router();

productRouter.post("/create", validationsProduct, validateResult, ProductController.createProduct);
productRouter.get("/:id", validateResult,ProductController.getProductById);
productRouter.get("/list", ProductController.getAllProducts);
productRouter.put("/edit/:id", ProductController.updateProduct);
productRouter.delete("/delete/:id", ProductController.deleteProduct);

export default productRouter;