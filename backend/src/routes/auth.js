import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

export default router;