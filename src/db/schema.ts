import { mysqlTable, varchar, serial } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  nickname: varchar('nickname', { length: 255 }).unique()
});