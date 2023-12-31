import { Request, Response, Router } from 'express';
import UserController from '../controllers/UsersController';
import Validations from '../middleware';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => {
    res.status(200).json({ role: req.body.user.role });
  },
);

export default userRouter;
