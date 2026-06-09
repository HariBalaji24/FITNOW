import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,

  // Connection health settings
  max: 10,                  // max pool size
  idleTimeoutMillis: 30000, // close idle connections after 30s
  connectionTimeoutMillis: 5000, // fail fast if can't connect in 5s
  keepAlive: true,          // send TCP keepalive pings
});

db.on("connect", () => console.log("✅ Connected to PostgreSQL"));
db.on("error", (err) => console.error("⚠️ DB Error:", err));

export { db };