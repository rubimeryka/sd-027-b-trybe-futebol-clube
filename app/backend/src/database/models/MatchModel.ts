import Matches from './Matches';
import Teams from './Teams';
import IMatches from '../../Interfaces/matches/Matches';

export default class MatchModel {
  private model = Matches;

  async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async getMatchesInProgress(inProgress: boolean): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}