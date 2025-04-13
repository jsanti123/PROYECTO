import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validationsCreateProduct, validationsUpdateProduct, validationsProductId} from "../utils/validators/productValidator";
import { validateResult } from "../utils/share/validationUtil";

const productRouter = Router();

productRouter.post("/create", validationsCreateProduct, validateResult, ProductController.createProduct);
productRouter.get("/list", ProductController.getAllProducts);
productRouter.put("/edit/:id", validationsUpdateProduct, validationsProductId, validateResult, ProductController.updateProduct);
productRouter.delete("/delete/:id", validationsProductId, validateResult, ProductController.deleteProduct);
productRouter.get("/:id", validationsProductId, validateResult, ProductController.getProductById);

export default productRouter;