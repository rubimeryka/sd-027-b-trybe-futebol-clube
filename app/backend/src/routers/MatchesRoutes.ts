import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middleware';

const matchesController = new MatchesController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matchRouter.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
matchRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchRouter.post(
  '/',
  Validations.validateToken,
  Validations.validateMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchRouter;
