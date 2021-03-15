import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { notFoundError, errorHandler } from './errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';

//Set up .env file
dotenv.config();

//Connect to MongoDB Atlas
connectDB();

//Initialize app
const app = express();
app.use(bodyParser.json());

//Routing
app.use('/api/products', productRoutes);

//Error handling
app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT | 5000;

//Start server
app.listen(port, () => console.log(`Listening on port ${port} in ${process.env.NODE_ENV} mode...`));