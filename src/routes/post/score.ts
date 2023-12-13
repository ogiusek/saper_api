import { and, eq } from "drizzle-orm";
import { getDb, scores } from "../../db";
import { app } from "../express";
import { toPromise } from "../../utils";

// limit 15
// offset
// where  user id/name
// where  boardSize

interface postScoreBody extends Object {
  nickname: string,
  time_in_ms: number,
  board_size: string
};

export function postScore() {
  // const dbAsync = getDb();
  app.post('/post/score', async (req, res) => {
    const body = req.body as postScoreBody;
    if (!body.hasOwnProperty('nickname') || !/^(?=[a-zA-Z0-9_-]{3,32}$)[a-zA-Z0-9_-]+$/.test(body.nickname) ||
      !body.hasOwnProperty('time_in_ms') || body.time_in_ms < 1000 ||
      !body.hasOwnProperty('board_size') || body.board_size.length > 5)
      return res.sendStatus(422);

    try {
      const db = await getDb();
      const oldScore = await db.select({ "time_in_ms": scores.time_in_ms }).from(scores)
        .where(and(eq(scores.board_size, body.board_size), eq(scores.nickname, body.nickname)));

      if (oldScore.length !== 0 && oldScore[0].time_in_ms > body.time_in_ms)
        await db.delete(scores).where(and(eq(scores.board_size, body.board_size), eq(scores.nickname, body.nickname)));

      if (oldScore.length === 0 || oldScore[0].time_in_ms > body.time_in_ms)
        await db.insert(scores).values({ 'nickname': body.nickname, 'board_size': body.board_size.toLocaleLowerCase(), 'time_in_ms': body.time_in_ms });

      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(500);
    }
  });
}