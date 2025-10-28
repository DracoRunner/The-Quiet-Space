import type { PrismaClient } from "@prisma/client";

export async function ensureBlogColumns(prisma: PrismaClient) {
  const stmts = [
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "readTime" integer;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "imageSeed" text;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "excerpt" text;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "category" text;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "format" text;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "author" text;`,
    `ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "publishedAt" timestamptz;`,
  ];

  for (const s of stmts) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const client = prisma as unknown as {
        $executeRawUnsafe: (sql: string) => Promise<unknown>;
      };
      await client.$executeRawUnsafe(s);
    } catch (err) {
      // Don't throw in dev helper; just log and continue
      // eslint-disable-next-line no-console
      console.warn("dbMigrations.ensureBlogColumns failed:", String(err));
    }
  }
}

export default ensureBlogColumns;
