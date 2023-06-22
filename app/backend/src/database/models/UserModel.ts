import IUser from '../../Interfaces/users/Users';
import Users from './Users';
import { IUserModel } from '../../Interfaces/users/IUsersModel';

export default class UserModel implements Partial<IUserModel> {
  private model = Users;

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) return null;

    const { email, password, username, role } = user;

    return { id, email, password, username, role };
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    const { id, username, role, password } = user;

    return { id, username, role, email, password };
  }
}
