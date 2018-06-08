import {Team} from "./team";
import {Bet} from "./bet";

export class Game {
  id: number;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  startDateTime: string;
  bet: number;
}

