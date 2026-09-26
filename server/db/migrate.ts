import fs from 'fs';
import path from 'path';
import { run } from './database';

async function runMigrations() {
  console.log('⚡ Running Database Migrations...');
  try {
    const migrationPath = path.resolve(process.cwd(), 'server', 'db', 'migrations', '001_initial_schema.sql');
    if (fs.existsSync(migrationPath)) {
      const sqlContent = fs.readFileSync(migrationPath, 'utf-8');
      const statements = sqlContent.split(';').map((s) => s.trim()).filter((s) => s.length > 0);

      for (const statement of statements) {
        await run(statement);
      }
      console.log('✅ Migrations executed successfully!');
    } else {
      console.warn('⚠️ Migration SQL file not found at:', migrationPath);
    }
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

runMigrations();
