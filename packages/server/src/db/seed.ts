import { pool } from "./pool.js";
import { config } from "../config.js";

try {
  const project = await pool.query(
    `INSERT INTO projects (user_id, name, description)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, name) DO UPDATE SET description = EXCLUDED.description
     RETURNING id`,
    [config.ORBIT_DEFAULT_USER_ID, "ORBIT Getting Started", "A sample project created by the ORBIT seed script."]
  );
  await pool.query(
    `INSERT INTO tasks (user_id, project_id, title, description, priority)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT DO NOTHING`,
    [config.ORBIT_DEFAULT_USER_ID, project.rows[0].id, "Explore the ORBIT engines", "Try Flow, Dev, Studio and Automate tools.", "medium"]
  );
  console.log("Seed data ready.");
} catch (error) {
  console.error("Seed failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}