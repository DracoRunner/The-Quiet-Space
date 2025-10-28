import type { Confession } from "##/types/Confession";
import { prisma } from "./baseService";

const createConfession = async (content: string): Promise<Confession> => {
  try {
    const newConfession = await prisma.confession.create({
      data: {
        content,
      },
    });
    return newConfession;
  } catch (e) {
    console.error("Error creating confession:", e);
    throw e;
  }
};

const getConfessionById = () => {};

const getAllConfessions = async (): Promise<Confession[]> => {
  try {
    return await prisma.confession.findMany();
  } catch (e) {
    console.error("Error fetching confessions:", e);
    return [];
  }
};

const deleteConfession = () => {};

const ConfessionService = {
  createConfession,
  getConfessionById,
  getAllConfessions,
  deleteConfession,
};

export default ConfessionService;
