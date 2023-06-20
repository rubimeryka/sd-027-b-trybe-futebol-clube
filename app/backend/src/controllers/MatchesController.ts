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
}
