import { and, eq, like, sql } from "drizzle-orm";
import { getDb, scores } from "../../db";
import { app } from "../express";

// limit 15
// offset
// where  user id/name
// where  boardSize

interface IGetScore extends Object {
  offset?: number,
  user_name?: string,
  board_size?: string
};

export function getScore() {
  const dbAsync = getDb();
  app.get('/get/score', async (req, res) => {
    const db = await dbAsync;
    const params = req.query as IGetScore;

    const canUseBoardSize = params.board_size?.length !== undefined && params.board_size.length <= 5;
    const canUseUserName = params.user_name?.length !== undefined && params.user_name.length <= 32;
    const offset: number = !isNaN(Number(params.offset)) ? params.offset as number : 0;

    const selected = await db.select({
      "_": sql`DISTINCT(CONCAT(${scores.nickname}, '/', ${scores.board_size}))`,
      "nickname": scores.nickname, "board_size": scores.board_size, "time_in_ms": scores.time_in_ms
    }).from(scores).orderBy(scores.time_in_ms)
      .where(and(
        // eq(scores.nickname, canUseUserName ? params.user_name as string : scores.nickname),
        like(scores.nickname, `${canUseUserName ? params.user_name : ''}%`),
        eq(scores.board_size, canUseBoardSize ? params.board_size as string : scores.board_size)))
      .limit(15).offset(offset);

    return res.json(selected.map(({ nickname, board_size, time_in_ms }) => ({ nickname, board_size, time_in_ms })));
  });
}
// SELECT nickname, board_size, time_in_ms FROM (SELECT DISTINCT(nickname, board_size), 
//     nickname, board_size, time_in_ms 
//   FROM scores