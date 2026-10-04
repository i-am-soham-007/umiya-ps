import express from 'express';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;
