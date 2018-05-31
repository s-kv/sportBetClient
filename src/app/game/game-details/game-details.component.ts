import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../model/game";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  private selectedGame: Game;
  private gameList: Game[];
  private errorMessage: string;

  constructor(private gameService: GameService,
              public router: Router) { }

  ngOnInit() : void {
    this.gameService.getGames().subscribe(data => {
      console.log(data);
      this.gameList = data;
    }, err => {
      console.log(err);
      // this.errorMessage = err;
    })
  }

  public getGameDetails() {
    // this.gameService.getGame(this.game).subscribe(data => {
    //     this.router.navigate(['/profile']);
    //   }, err => {
    //     console.log(err);
    //     this.errorMessage = err;
    //   }
    // )
  }
}
