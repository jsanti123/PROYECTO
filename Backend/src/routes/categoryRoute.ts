import { Router } from 'express';
import { validationsCreateCategory, validationsUpdateCategory, validationsCategoryId } from '../utils/validators/categoryValidator';
import { validateResult } from '../utils/share/validationUtil';
import { CategoryController } from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.post('/create', validationsCreateCategory, validateResult, CategoryController.createCategory);
categoryRouter.get('/list', CategoryController.getAllCategories);
categoryRouter.put('/edit/:id', validationsUpdateCategory, validationsCategoryId, validateResult, CategoryController.updateCategory);
categoryRouter.delete('/delete/:id', validationsCategoryId, validateResult, CategoryController.deleteCategory);
categoryRouter.get('/:id', validationsCategoryId,validateResult, CategoryController.getCategoryById);

export default categoryRouter;