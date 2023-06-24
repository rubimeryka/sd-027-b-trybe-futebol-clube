import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) { }

  private async getLeaderboard(
    req: Request,
    res: Response,
    leaderboardType: 'Home' | 'Away' | 'Total',
  ) {
    const serviceResponse = await this.leaderboardService[`getLeaderboard${leaderboardType}`]();

    return res.status(200).json(serviceResponse);
  }

  async getLeaderboardHome(req: Request, res: Response) {
    return this.getLeaderboard(req, res, 'Home');
  }

  async getLeaderboardAway(req: Request, res: Response) {
    return this.getLeaderboard(req, res, 'Away');
  }

  async getLeaderboardTotal(req: Request, res: Response) {
    return this.getLeaderboard(req, res, 'Total');
  }
}
