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
}
