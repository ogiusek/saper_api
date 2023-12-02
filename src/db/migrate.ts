import { getDb } from "./db";
import { migrate } from 'drizzle-orm/mysql2/migrator';

export async function performMigration() {
  const db = await getDb();
  await migrate(db, { migrationsFolder: './drizzle' });
}