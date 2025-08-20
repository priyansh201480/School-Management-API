import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10
});

// Optional: verify once at boot
(async () => {
  const [r] = await pool.query('SELECT 1');
  console.log('MySQL ready:', r);
})().catch(err => console.error('MySQL error:', err.message));

export default pool;


