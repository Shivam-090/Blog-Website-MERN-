import express from 'express';
import {
    getCurrentUser,
    getUserProfile,
    loginUser,
    resetForgottenPassword,
    signupUser,
    updateUserPassword,
    verifyResetEmail
} from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/verify-reset-email', verifyResetEmail);
userRouter.post('/reset-password', resetForgottenPassword);
userRouter.get('/me', userAuth, getCurrentUser);
userRouter.get('/profile', userAuth, getUserProfile);
userRouter.post('/update-password', userAuth, updateUserPassword);

export default userRouter;
