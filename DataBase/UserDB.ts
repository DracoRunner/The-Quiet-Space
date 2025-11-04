import { PrismaClient } from "@prisma/client";
import { hashPassword } from "##/utils/auth";

const prisma = new PrismaClient();

/**
 * Create a new user
 */
async function createUser(data: {
  username: string;
  password: string;
  email?: string;
  role?: "admin" | "superadmin";
}) {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role: data.role || "admin",
    },
  });
}

/**
 * Find user by username
 */
async function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

/**
 * Find user by ID
 */
async function findById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

/**
 * Get all users (without passwords)
 */
async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Delete user
 */
async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

const UserDB = {
  createUser,
  findByUsername,
  findById,
  getAllUsers,
  deleteUser,
};

export default UserDB;
