import { IMatchTeams } from '../Interfaces/matches/Matches';
import { ITeams } from '../Interfaces/teams/Teams';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

export default class LeaderBoard {
  static async getAllTeams(allTeams: ITeams[]): Promise<ILeaderBoard[]> {
    const emptyData: ILeaderBoard[] = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));

    return emptyData;
  }

  // estabelece pontuação
  static points(aTeamScore: number, bTeamScore: number, points: number): number {
    if (aTeamScore > bTeamScore) {
      return points + 3;
    }

    if (aTeamScore === bTeamScore) {
      return points + 1;
    }

    return points;
  }

  // estabelece comportamentos
  static win(aTeamScore: number, bTeamScore: number, wins: number): number {
    if (aTeamScore > bTeamScore) {
      return wins + 1;
    }

    return wins;
  }

  static loss(aTeamScore: number, bTeamScore: number, losses: number): number {
    if (aTeamScore < bTeamScore) {
      return losses + 1;
    }

    return losses;
  }

  static draw(aTeamScore: number, bTeamScore: number, draws: number): number {
    if (aTeamScore === bTeamScore) {
      return draws + 1;
    }

    return draws;
  }

  // saldo de gols
  static calculateGoalsBalance(goalsFavor: number, goalsOwn: number, balance: number): number {
    const currentGoalsBalance = balance + (goalsFavor - goalsOwn);

    return currentGoalsBalance;
  }

  static efficiency(points: number, games: number): number {
    const calculateEfficiency = (points / (games * 3)) * 100;

    return Number((calculateEfficiency.toFixed(2)));
  }

  // ordena resultados
  static orderByGoals(a: ILeaderBoard, b: ILeaderBoard): number {
    const balanceComparison = b.goalsBalance - a.goalsBalance;
    if (balanceComparison !== 0) {
      return balanceComparison;
    }

    return a.goalsFavor - b.goalsFavor;
  }

  static orderByWin(a: ILeaderBoard, b: ILeaderBoard): number {
    const victoriesComparison = b.totalVictories - a.totalVictories;
    if (victoriesComparison !== 0) {
      return victoriesComparison;
    }

    return this.orderByGoals(a, b);
  }

  static orderLeaderboard(leaderboard: ILeaderBoard[]): ILeaderBoard[] {
    return leaderboard.sort((a, b) => {
      const pointsComparison = b.totalPoints - a.totalPoints;
      if (pointsComparison !== 0) {
        return pointsComparison;
      }

      return this.orderByWin(a, b);
    });
  }

  static updateTeamStatistics(team: ILeaderBoard, match: IMatchTeams): ILeaderBoard {
    const { homeTeamGoals, awayTeamGoals } = match;

    return {
      ...team,
      totalPoints: this.points(homeTeamGoals, awayTeamGoals, team.totalPoints),
      totalGames: team.totalGames + 1,
      totalVictories: this.win(homeTeamGoals, awayTeamGoals, team.totalVictories),
      totalDraws: this.draw(homeTeamGoals, awayTeamGoals, team.totalDraws),
      totalLosses: this.loss(homeTeamGoals, awayTeamGoals, team.totalLosses),
      goalsFavor: team.goalsFavor + homeTeamGoals,
      goalsOwn: team.goalsOwn + awayTeamGoals,
      goalsBalance: this.calculateGoalsBalance(homeTeamGoals, awayTeamGoals, team.goalsBalance),
      efficiency: this.efficiency(team.totalPoints, team.totalGames),
    };
  }

  static updateLeaderboard(empty: ILeaderBoard[], matchs: IMatchTeams[]): ILeaderBoard[] {
    const leaderboard: ILeaderBoard[] = [];

    empty.forEach((team) => {
      let updatedTeam = { ...team };

      matchs.forEach((match) => {
        if (match.homeTeam?.teamName === team.name) {
          updatedTeam = this.updateTeamStatistics(updatedTeam, match);
        }
      });

      leaderboard.push(updatedTeam);
    });

    return leaderboard;
  }

  static teamsHome(empty: ILeaderBoard[], matchs: IMatchTeams[]): ILeaderBoard[] {
    return this.updateLeaderboard(empty, matchs);
  }

  static teamsAway(empty: ILeaderBoard[], matchs: IMatchTeams[]): ILeaderBoard[] {
    const updatedMatches: IMatchTeams[] = matchs.map((match) => ({
      ...match,
      homeTeam: match.awayTeam,
      awayTeam: match.homeTeam,
      homeTeamGoals: match.awayTeamGoals,
      awayTeamGoals: match.homeTeamGoals,
    }));

    return this.updateLeaderboard(empty, updatedMatches);
  }

  static total(home: ILeaderBoard[], away: ILeaderBoard[]): ILeaderBoard[] {
    const leaderboard: ILeaderBoard[] = [];

    home.forEach((team) => {
      const updatedTeam = { ...team };

      away.forEach((a) => {
        if (updatedTeam.name === a.name) {
          updatedTeam.totalPoints += a.totalPoints;
          updatedTeam.totalGames += a.totalGames;
          updatedTeam.totalVictories += a.totalVictories;
          updatedTeam.totalDraws += a.totalDraws;
          updatedTeam.totalLosses += a.totalLosses;
          updatedTeam.goalsFavor += a.goalsFavor;
          updatedTeam.goalsOwn += a.goalsOwn;
          updatedTeam.goalsBalance += a.goalsBalance;
          updatedTeam.efficiency = this.efficiency(updatedTeam.totalPoints, updatedTeam.totalGames);
        }
      }); leaderboard.push(updatedTeam);
    });

    return leaderboard;
  }
}
