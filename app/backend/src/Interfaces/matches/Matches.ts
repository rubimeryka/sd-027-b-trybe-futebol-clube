import { ITeams } from '../teams/Teams';

export default interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchTeams extends IMatches {
  homeTeam?: Partial<ITeams>;
  awayTeam?: Partial<ITeams>;
}
