import dotenv from 'dotenv';
dotenv.config();

export interface DatabaseConfig {
  driver: 'postgres' | 'mysql' | 'json';
  connectionString?: string;
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
  ssl: boolean;
}

export const dbConfig: DatabaseConfig = {
  driver: (process.env.DB_DRIVER as any) || (process.env.DATABASE_URL ? 'postgres' : 'postgres'),
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.PGPORT || process.env.MYSQL_PORT || '5432', 10),
  user: process.env.PGUSER || process.env.MYSQL_USER || 'postgres',
  password: process.env.PGPASSWORD || process.env.MYSQL_PASSWORD || 'postgres',
  database: process.env.PGDATABASE || process.env.MYSQL_DATABASE || 'umiya_studio',
  ssl: process.env.DB_SSL === 'true'
};
