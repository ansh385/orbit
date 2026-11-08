import dotenv from "dotenv";
import { resolve } from "node:path";
import { z } from "zod";

dotenv.config({ path: resolve(process.cwd(), "../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8787),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string().url(),
  ORBIT_API_TOKEN: z.string().min(32).optional(),
  ORBIT_DEFAULT_USER_ID: z.string().min(1).default("self-hosted"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  GITHUB_TOKEN: z.string().optional(),
  API_TEST_TIMEOUT_MS: z.coerce.number().int().min(1000).max(30000).default(10000),
  MAX_API_RESPONSE_BYTES: z.coerce.number().int().min(1024).max(5_000_000).default(1_048_576)
});

export const config = envSchema.parse(process.env);