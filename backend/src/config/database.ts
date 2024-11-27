import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PG_HOST || "postgres" || "localhost",
  port: parseInt(process.env.PG_PORT || "5432" || "5433", 10),
  database: process.env.PG_NAME || "tripdb",
  user: process.env.PG_USER || "user",
  password: process.env.PG_PASSWORD || "password",
});

export default pool;