import { sequelize, connectDB } from '../db/sequelize';
import { Page } from './Page';
import { Section } from './Section';
import { User } from './User';
import { Setting } from './Setting';
import { Media } from './Media';
import { Faq } from './Faq';

// Export all models so they can be easily imported from this folder
export {
  sequelize,
  connectDB,
  Page,
  Section,
  User,
  Setting,
  Media,
  Faq
};
