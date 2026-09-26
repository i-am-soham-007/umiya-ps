import { initDatabase } from './database';

async function runSeed() {
  console.log('🌱 Running Database Seeders...');
  try {
    await initDatabase();
    console.log('✅ Database Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

runSeed();
