import IUser from '../../Interfaces/users/Users';
import Users from './Users';

export default class UserModel {
  private model = Users;

  async findOneUser(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const { id, username, password, role } = user;
    return { id, username, password, role, email };
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) {
      return null;
    }
    const { username, password, role, email } = user;
    return { id, username, password, role, email };
  }
}
