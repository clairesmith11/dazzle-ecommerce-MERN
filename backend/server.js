import express from 'express';
import dotenv from 'dotenv';

import { notFoundError, errorHandler } from './errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';

//Set up .env file
dotenv.config();

//Connect to MongoDB Atlas
connectDB();

//Initialize app
const app = express();
app.use(express.json());

//Routing
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//Error handling
app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT | 5000;

//Start server
app.listen(port, () => console.log(`Listening on port ${port} in ${process.env.NODE_ENV} mode...`));