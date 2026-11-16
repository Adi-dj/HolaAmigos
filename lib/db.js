import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const globalForDb = globalThis;

function makePool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const local = /localhost|127\.0\.0\.1|\/var\/run/.test(url) || url.includes('host=/');
  return new Pool({
    connectionString: url,
    ssl: local ? false : { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 10_000,
  });
}

const pool = globalForDb.__hamPool || (globalForDb.__hamPool = makePool());

let ready = globalForDb.__hamReady;

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      track TEXT NOT NULL DEFAULT 'young' CHECK (track IN ('young','older')),
      avatar TEXT NOT NULL DEFAULT '🦁',
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      streak INT NOT NULL DEFAULT 0,
      last_active DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_id TEXT NOT NULL,
      stars INT NOT NULL DEFAULT 0,
      attempts INT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, lesson_id)
    );
  `);
  const { rows } = await pool.query('SELECT 1 FROM users WHERE is_admin LIMIT 1');
  if (rows.length === 0 && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await pool.query(
      `INSERT INTO users (username, password_hash, display_name, track, avatar, is_admin)
       VALUES ($1, $2, $3, 'older', '🦉', TRUE) ON CONFLICT (username) DO NOTHING`,
      [process.env.ADMIN_USERNAME.trim().toLowerCase(), hash, 'מנהל']
    );
  }
}

export async function query(text, params) {
  if (!ready) {
    ready = globalForDb.__hamReady = init().catch((e) => {
      ready = globalForDb.__hamReady = null;
      throw e;
    });
  }
  await ready;
  return pool.query(text, params);
}
