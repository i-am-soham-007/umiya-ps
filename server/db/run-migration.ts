import { connectDB, sequelize } from '../models/index';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const runMigration = async () => {
  try {
    console.log('Starting migration...');
    // This will connect and sync all models
    await connectDB();
    
    // Seed default admin user if none exists
    const adminCount = await User.count();
    if (adminCount === 0) {
      console.log('No admin users found. Creating default admin...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        email: 'admin@umiyastudio.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin'
      });
      console.log('Default admin created: admin@umiyastudio.com / password123');
    }
    
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

runMigration();
