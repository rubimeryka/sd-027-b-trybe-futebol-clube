import { NextFunction, Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';
import JWT from '../utils/JWT';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const verifyUser = JWT.verify(token);
    req.body.user = verifyUser;

    if (verifyUser === 'Token must be a valid token') {
      return res.status(401).json({ message: verifyUser });
    }

    next();
  }
}
export default Validations;
