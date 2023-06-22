import { NextFunction, Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';
import JWT from '../utils/JWT';
import TeamsService from '../services/TeamsService';

export default class Validations {
  static validateLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
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

  static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ):
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

  static async validateMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { homeTeamId, awayTeamId } = req.body;
    const teamService = new TeamsService();

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const homeId = await teamService.findById(homeTeamId);
    const awayId = await teamService.findById(awayTeamId);

    if (homeId.status === 'NOT_FOUND' || awayId.status === 'NOT_FOUND') {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
