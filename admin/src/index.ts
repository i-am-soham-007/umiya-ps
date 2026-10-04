import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Static folder for local uploads
app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/api/admin', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to CMS Admin API' });
});

// Import Routes
import routes from './routes';
app.use('/api/admin', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Admin Server running on port ${PORT}`);
});
