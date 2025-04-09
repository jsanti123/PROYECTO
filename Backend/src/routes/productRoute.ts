import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validationsCreateProduct, validationsSearchProduct, validationsUpdateProduct} from "../utils/validators/productValidator";
import { validateResult } from "../utils/share/validationUtil";

const productRouter = Router();

productRouter.post("/create", validationsCreateProduct, validateResult, ProductController.createProduct);
productRouter.get("/list", ProductController.getAllProducts);
productRouter.put("/edit/:id", validationsUpdateProduct, validateResult, ProductController.updateProduct);
productRouter.delete("/delete/:id", ProductController.deleteProduct);
productRouter.get("/:id", validationsSearchProduct, validateResult, ProductController.getProductById);

export default productRouter;