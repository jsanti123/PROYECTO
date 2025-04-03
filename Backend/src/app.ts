import express from 'express';

const app = express();
app.use(express.json()); //middleware to parse JSON bodies

export default app; 