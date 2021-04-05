import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { notFoundError, errorHandler } from './errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

//Create static folder for image uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Point to build folder for static assets during production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    //Any other route not handled by the API for will deliver index.html
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

//Error handling
app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT | 5000;

//Start server
app.listen(port, () => console.log(`Listening on port ${port} in ${process.env.NODE_ENV} mode...`));