import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: '.env.local' });

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL .env.local mein nahi mila.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

try {
  const result = await pool.query(`
    SELECT current_database() AS database_name,
           NOW() AS server_time
  `);

  console.log('SUCCESS: PostgreSQL connected!');
  console.log(result.rows[0]);
} catch (error) {
  console.error('DATABASE CONNECTION FAILED');
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}