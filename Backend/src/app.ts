import express from 'express';
import routerProduct from './routes/productRoute';
import routerCategory from './routes/categoryRoute';

const app = express();
const apiRouter= express.Router();
app.use(express.json());

apiRouter.use('/categories', routerCategory);
apiRouter.use('/products', routerProduct);

app.use('/api/v1', apiRouter);

export default app; 