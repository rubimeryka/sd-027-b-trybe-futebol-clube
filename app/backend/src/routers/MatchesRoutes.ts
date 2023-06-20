import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchRouter;
