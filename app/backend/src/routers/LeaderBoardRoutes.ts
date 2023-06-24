import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderboardService from '../services/LeaderBoardService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamsModel';

const teamModel = new TeamModel();
const matchModel = new MatchModel();
const leaderboardService = new LeaderboardService(matchModel, teamModel);
const leaderboardController = new LeaderBoardController(leaderboardService);

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardHome(req, res));

leaderBoardRouter.get('/away', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardAway(req, res));

leaderBoardRouter.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboardTotal(req, res),
);

export default leaderBoardRouter;
