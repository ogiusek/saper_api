import {
  mysqlTable,
  varchar, int
} from 'drizzle-orm/mysql-core';


// export const users = mysqlTable('users', {
//   id: int('id').primaryKey().autoincrement(),
//   nickname: varchar('nickname', { length: 255 }).unique()
// });

export const scores = mysqlTable('scores', {
  // user_id: int('user_id').references(() => users.id).notNull(),
  nickname: varchar('nickname', { length: 32 }).notNull(),
  board_size: varchar('board_size', { length: 5 }).notNull(),
  time_in_ms: int('time_in_ms').notNull()
});