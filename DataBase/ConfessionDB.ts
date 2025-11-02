import type { Confession } from "@prisma/client";
import { prisma, safeDbTransaction } from "./BaseDb";

const createConfession = async (content: string): Promise<Confession> => {
  return safeDbTransaction(async () => {
    return await prisma.confession.create({
      data: {
        content,
      },
    });
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
