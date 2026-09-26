import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { Page } from './Page';

export class Section extends Model {}

Section.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sectionKey: {
      type: DataTypes.STRING, // e.g., 'hero', 'about_us', 'pricing'
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON, // stores flexible JSON configuration for the section
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    tableName: 'sections',
  }
);

Page.hasMany(Section, { foreignKey: 'pageId', as: 'sections' });
Section.belongsTo(Page, { foreignKey: 'pageId' });
