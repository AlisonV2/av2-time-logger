import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router
  .post('/auth/signup', AuthController.createUser)
  .post('/auth/login', AuthController.login)
  .post('/auth/logout', AuthController.logout)
  .post('/auth/token', AuthController.refreshToken)
  .post('/auth/change-password', AuthController.changePassword)

export { router as authRouter };
