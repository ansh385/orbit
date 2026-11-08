import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pool } from "./pool.js";

try {
  const sql = await readFile(resolve(process.cwd(), "../../database/migrations/001_initial.sql"), "utf8");
  await pool.query(sql);
  console.log("ORBIT database migration applied.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}