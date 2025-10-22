import { neon } from "@neondatabase/serverless";
import { dbLogger } from "../utils/logger";

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not defined in environment");
}

const sql = neon(process.env.NEON_DATABASE_URL);

export interface Confession {
  id: string;
  content: string;
  createdAt: Date;
}

export const confessionService = {
  async createConfession(content: string): Promise<Confession> {
    try {
      const result = await sql`
        INSERT INTO confessions (content, created_at)
        VALUES (${content}, NOW())
        RETURNING id, content, created_at as "createdAt"
      `;

      dbLogger.info("Confession created successfully");
      return result[0] as Confession;
    } catch (error) {
      dbLogger.error("Error creating confession:", error);
      throw new Error("Failed to create confession");
    }
  },
};
