// import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/MatchModel';
import IMatches from '../Interfaces/matches/Matches';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchModel(),
  ) { }

  async getAllMatches(query: string): Promise<IMatches[]> {
    if (query !== undefined) {
      const inProgress = query === 'true';

      const macthes = await this.matchesModel.getMatchesInProgress(inProgress);

      return macthes;
    }

    const allMatches = await this.matchesModel.findAll();

    return allMatches;
  }

  async finishMatch(id: number) {
    const match = await this.matchesModel.finishMatch(id);
    return { message: 'Finished', data: match };
  }

  async updateMatch(id: number, body:{
    homeTeamGoals: number,
    awayTeamGoals: number,
  }) {
    const updatedMatch = await this.matchesModel.updateMatch(id, body);
    return { message: 'Updated', data: updatedMatch };
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await this.matchesModel
      .createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );

    return { message: 'SUCCESSFUL', data: match };
  }
}
