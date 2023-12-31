import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import IUser from '../Interfaces/users/Users';
import ILogin from '../Interfaces/users/ILogin';
import { IUserModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  private errorMessage = { message: 'Invalid email or password' };
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  async login(data: ILogin): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: this.errorMessage };
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: this.errorMessage };
    }

    const { email, role, id } = user as IUser;

    const token = this.jwtService.sign({ email, role, id });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
