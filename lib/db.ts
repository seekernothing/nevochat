import { prisma } from "./prisma";

/**
 * Default export alias for prisma client.
 * Provides a shorter import path: `import db from "@/lib/db"`
 */
const db = prisma;
export default db;
