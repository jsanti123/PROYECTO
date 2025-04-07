import express from 'express';
import routerProduct from './routes/productRoute';

const app = express();
app.use(express.json()); //middleware to parse JSON bodies


app.use('/api/v1', routerProduct); //mount the product routes on /api

export default app; 