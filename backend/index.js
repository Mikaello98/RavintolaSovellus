import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import restaurantRoutes from './routes/restaurant.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));