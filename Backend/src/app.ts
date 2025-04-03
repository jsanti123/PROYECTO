import express from 'express';
import { connectDB} from './config/db';

const app = express();
app.use(express.json()); //middleware to parse JSON bodies
connectDB(); //connect to the databases

export default app; 