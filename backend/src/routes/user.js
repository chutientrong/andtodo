import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = Router();

userRouter.get('', UserController.getList);
userRouter.get('/email/:email', UserController.getByUsername);
userRouter.get('/id/:userId', UserController.getUserById);

export default userRouter;