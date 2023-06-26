import TeamModel from '../database/models/TeamsModel';
import MatchModel from '../database/models/MatchModel';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';
import leaderBoard from '../utils/leaderBoard';

export default class LeaderboardService {
  constructor(
    private matchModel: MatchModel,
    private teamModel: TeamModel,
  ) { }

  async getLeaderboardByType(type: 'Home' | 'Away'): Promise<ILeaderBoard[]> {
    const matches = await this.matchModel.findAll();
    const teams = await this.teamModel.findAll();
    const leaderboardEmpty = await leaderBoard.getAllTeams(teams);

    let result: ILeaderBoard[];

    if (type === 'Home') {
      result = leaderBoard.teamsHome(leaderboardEmpty, matches);
    } else {
      result = leaderBoard.teamsAway(leaderboardEmpty, matches);
    }

    return leaderBoard.orderLeaderboard(result);
  }

  async getLeaderboardHome(): Promise<ILeaderBoard[]> {
    return this.getLeaderboardByType('Home');
  }

  async getLeaderboardAway(): Promise<ILeaderBoard[]> {
    return this.getLeaderboardByType('Away');
  }

  async getLeaderboardTotal(): Promise<ILeaderBoard[]> {
    const away = await this.getLeaderboardAway();
    const home = await this.getLeaderboardHome();
    const result = leaderBoard.total(home, away);

    return leaderBoard.orderLeaderboard(result);
  }
}
