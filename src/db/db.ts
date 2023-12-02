import { drizzle } from "drizzle-orm/mysql2";
import { connection } from "./connection";

export const getDb = async () => drizzle(await connection);
