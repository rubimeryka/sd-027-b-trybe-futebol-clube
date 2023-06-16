import IUser from './Users';

export interface IUsersModel {
  findOneUser(email: string): Promise<IUser | null>;
}
