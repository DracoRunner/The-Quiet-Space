import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const safeDbTransaction = async <T>(
  operations: () => Promise<T>,
): Promise<T> => {
  try {
    return await operations();
  } catch (e) {
    console.error("Database transaction failed:", e);
    throw e;
  }
};
