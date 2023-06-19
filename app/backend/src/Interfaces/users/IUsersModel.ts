import { ICRUDModelReader } from '../ICRUDModel';
import IUser from './Users';

export interface IUserModel extends Partial<ICRUDModelReader<IUser>>{
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
