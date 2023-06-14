import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';

  class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

TeamsModel.init({
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  teamName:{
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'team_name',
  }
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamsModel;