import {Game} from "./game";
import {User} from "./user";

export class Bet {
  id: number;
  game: Game;
  user: User;
  score1: number;
  score2: number;
}
