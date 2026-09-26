import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';

export class Setting extends Model {}

Setting.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON, // Using JSON for complex settings objects
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'settings',
  }
);
