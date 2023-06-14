import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Users extends Model<InferAttributes<Users>,
InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default Users;
