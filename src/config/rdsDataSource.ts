import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const RDSDataSource = new DataSource({
  type: 'postgres',
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT) || 5432,
  username: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: [path.join(__dirname, '../entities/*.js')],
  ssl: { rejectUnauthorized: false },
});
