import express from 'express';
import routerProduct from './routes/productRoute';
import routerCategory from './routes/categoryRoute';
import routerWarehouse from './routes/warehouseRoute'; // Assuming you have a warehouse route

const app = express();
const apiRouter= express.Router();
app.use(express.json());

apiRouter.use('/categories', routerCategory);
apiRouter.use('/products', routerProduct);
apiRouter.use('/warehouses', routerWarehouse); // Assuming you have a warehouse route

app.use('/api/v1', apiRouter);

export default app; 