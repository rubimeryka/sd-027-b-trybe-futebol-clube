import TeamsModel from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeams } from '../Interfaces/teams/Teams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
