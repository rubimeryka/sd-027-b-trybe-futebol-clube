import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await this.matchesService.getAllMatches(inProgress as string);

    return res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const match = await this.matchesService.finishMatch(Number(id));

    return res.status(200).json(match.message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    const match = await this.matchesService.updateMatch(Number(id), req.body);

    return res.status(200).json(match.message);
  }

  async createMatch(req: Request, res: Response) {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals } = req.body;

    const match = await this.matchesService
      .createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );

    return res.status(201).json(match.data);
  }
}
