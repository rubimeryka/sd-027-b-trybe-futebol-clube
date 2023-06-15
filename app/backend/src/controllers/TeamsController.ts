import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamsService.findById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
