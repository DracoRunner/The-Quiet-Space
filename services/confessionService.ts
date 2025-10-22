import { neon } from "@neondatabase/serverless";
import { dbLogger } from "../utils/logger";

const sql = neon(process.env.NEON_DATABASE_URL!);

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

  async getAllConfessions(): Promise<Confession[]> {
    try {
      const result = await sql`
        SELECT id, content, created_at as "createdAt"
        FROM confessions
        ORDER BY created_at DESC
      `;
      dbLogger.info("Fetched all confessions");
      return result as Confession[];
    } catch (error) {
      dbLogger.error("Error fetching confessions:", error);
      throw new Error("Failed to fetch confessions");
    }
  },
};
