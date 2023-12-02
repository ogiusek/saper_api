import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { getDb } from "./db/db";
import { performMigration } from "./db/migrate";
import { users } from "./db/schema";
import { toPromise } from "./utils/toPromise";

console.log('works');

async function test() {
  await performMigration();

  // @ts-ignore
  const db = await getDb();
  const allUsers = await db.select().from(users);
  console.log(allUsers);
  await (toPromise(() => db.insert(users).values({ nickname: 'my nickname' }))
    .catch(console.log));
};

// getDb();

test().then(() => {
  console.log("finished");
});
