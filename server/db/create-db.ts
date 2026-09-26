import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const createDatabase = async () => {
  try {
    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'umiya_studio';

    console.log(`Connecting to MySQL at ${host} as ${user}...`);
    
    // Connect without specifying a database
    const connection = await mysql.createConnection({
      host,
      user,
      password
    });

    console.log(`Successfully connected. Creating database '${database}' if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    
    console.log(`Database '${database}' is ready!`);
    await connection.end();
  } catch (error: any) {
    console.error('Failed to create database:', error.message);
    process.exit(1);
  }
};

createDatabase();
