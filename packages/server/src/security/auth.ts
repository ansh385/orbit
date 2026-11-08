import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "node:crypto";
import { config } from "../config.js";
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!config.ORBIT_API_TOKEN) return config.NODE_ENV === "production" ? res.status(503).json({ error: "Authentication token is not configured." }) : next();
  const header = req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token), b = Buffer.from(config.ORBIT_API_TOKEN);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return res.status(401).json({ error: "Unauthorized" });
  next();
}