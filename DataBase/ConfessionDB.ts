import type { Confession } from "@prisma/client";
import { prisma, safeDbTransaction } from "./BaseDb";

type SubmitterDetails = { name: string; email: string; phone?: string };

const createConfession = async (
  content: string,
  submitterDetails?: SubmitterDetails,
): Promise<Confession> => {
  return safeDbTransaction(async () => {
    // Create the confession with only known fields to avoid runtime errors
    const confession = await prisma.confession.create({
      data: { content },
    });

    // If submitterDetails are provided, attempt to persist them using a raw query.
    // This is intentionally tolerant: if the DB column doesn't exist yet (no migration run),
    // the raw query will fail and we'll catch and log the error instead of throwing.
    if (submitterDetails) {
      try {
        // Use a parameterized raw query to set the JSON column in Postgres.
        // Table name and column must match the Prisma schema mapping.
        await prisma.$executeRaw`
          UPDATE "Confession"
          SET submitter_details = ${JSON.stringify(submitterDetails)}
          WHERE id = ${confession.id}
        `;
      } catch (err) {
        // If this fails (e.g. column doesn't exist yet), don't break creation flow.
        // The developer should run the Prisma migration to add the column.
        // Keep a console warning for debugging in development.
        // eslint-disable-next-line no-console
        console.warn(
          "Could not persist submitterDetails via raw SQL. Did you run prisma migrate?",
          err,
        );
      }
    }

    return confession;
  });
};

const getAllConfessions = async (): Promise<Confession[]> => {
  return safeDbTransaction(async () => {
    return await prisma.confession.findMany();
  });
};

const getConfessionById = async (id: string) => {
  return safeDbTransaction(async () => {
    return await prisma.confession.findUnique({ where: { id } });
  });
};

const deleteConfession = async (id: string): Promise<void> => {
  return safeDbTransaction(async () => {
    await prisma.confession.delete({ where: { id } });
  });
};

const ConfessionDB = {
  createConfession,
  getConfessionById,
  getAllConfessions,
  deleteConfession,
};

export default ConfessionDB;
