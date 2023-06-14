import { Model, DataTypes, QueryInterface } from "sequelize";
import { ITeam } from "../../Interfaces/Teams";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.
    createTable<Model<ITeam>>('teams',
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      teamName:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams')
  }
};
