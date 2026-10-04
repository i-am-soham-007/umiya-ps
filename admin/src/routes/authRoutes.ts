import express from 'express';
import { login, register } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, register); // Only logged in admins should register others ideally

export default router;
