import { Router } from 'express';
import { validationsCategory } from '../utils/validators/categoryValidator';
import { validateResult } from '../utils/share/validationUtil';
import { CategoryController } from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.post('/create', validationsCategory, validateResult, CategoryController.createCategory);
categoryRouter.get('/:id', validateResult, CategoryController.getCategoryById);
categoryRouter.get('/list', CategoryController.getAllCategories);
categoryRouter.put('/edit/:id', CategoryController.updateCategory);
categoryRouter.delete('/delete/:id', CategoryController.deleteCategory);

export default categoryRouter;