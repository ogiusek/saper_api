import { getScore } from "./get/score";
import { postScore } from "./post/score";

export function define() {
  getScore();
  postScore();
}