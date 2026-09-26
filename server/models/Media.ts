import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';

export class Media extends Model {}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('image', 'video', 'youtube'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    altText: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    tableName: 'media',
  }
);
