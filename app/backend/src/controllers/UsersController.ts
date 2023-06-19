import { Request, Response } from 'express';
import UserService from '../services/UserService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
