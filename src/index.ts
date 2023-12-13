import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { eq, asc, desc, sql } from "drizzle-orm";

import { getDb, performMigration, scores } from "./db";
import { toPromise } from "./utils";
import { app } from "./routes";

console.log('Runs');
async function test() {
  const db = await getDb();
  // await db.delete(users).where(eq(users.nickname, ''));
  // const allUsers = await db.select().from(users);
  // console.log(allUsers);

  // await (toPromise(() => db.insert(users).values({ nickname: 'my nickname' })).catch(console.log));
  // const selected = await db.execute(sql`SELECT ${scores.nickname}, ${scores.board_size}, ${scores.time_in_ms} FROM (
  //   SELECT DISTINCT(${scores.nickname} + "/" + ${scores.board_size}),
  //     ${scores.nickname}, ${scores.board_size}, ${scores.time_in_ms}
  //   FROM ${scores});`);
  // const selected = (await db.execute(sql`SELECT DISTINCT(${scores.nickname} + "/" + ${scores.board_size}),
  //     ${scores.nickname}, ${scores.board_size}, ${scores.time_in_ms}
  //   FROM ${scores};`))[0];
  // const selected = await db.execute(sql`SELECT * FROM (SELECT * FROM scores);`);
  // console.log(selected);
};

performMigration().then(() => test().then(() => {
  console.log("Finished test");

  const port = 8080;
  app.listen(port, () => {
    console.log(`Listens on port ${port}`);
  });
}));