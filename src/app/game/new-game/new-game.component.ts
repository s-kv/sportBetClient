import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../model/game";
import {TeamService} from "../../services/team.service";
import {Team} from "../../model/team";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  private game: Game = new Game();
  private teamList: Team[];
  private dateStart: Date;
  private timeStart: string;
  private errorMessage: string;

  constructor(private gameService: GameService,
              private teamService: TeamService,
              public router: Router) { }

  ngOnInit() : void {
    this.teamService.getTeams().subscribe(data => {
      this.teamList = data;
    }, err => {
      console.log(err);
      // this.errorMessage = err;
    })
  }

  public newGame() {
    this.game.startDateTime = ("0" + this.dateStart.getDate()).slice(-2) + "-" + ("0"+(this.dateStart.getMonth()+1)).slice(-2) + "-" +
      ("0" + this.dateStart.getFullYear()).slice(-2) + " " + this.timeStart;
    console.log(this.game.startDateTime);
    this.gameService.newGame(this.game).subscribe(data => {
        this.router.navigate(['/game-details']);
      }, err => {
        console.log(err);
        this.errorMessage = err;
      }
    )
  }
}
