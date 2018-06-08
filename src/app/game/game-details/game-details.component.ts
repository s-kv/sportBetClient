import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../model/game";
import {GameService} from "../../services/game.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BetService} from "../../services/bet.service";
import {Bet} from "../../model/bet";
import {User} from "../../model/user";

export class ScoreBuffer {
  score1: number;
  score2: number;
}

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  private currentUser: User;

  private selectedGame: Game;
  private bet: Bet;
  private scoreBuf: ScoreBuffer;
  private gameList: Game[];
  private errorMessage: string;

  constructor(private gameService: GameService,
              private betService: BetService,
              public router: Router,
              private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() : void {
    this.gameService.getGamesWithUserBet(this.currentUser.id).subscribe(data => {
      this.gameList = data;
    }, err => {
      console.log(err);
      // this.errorMessage = err;
    });
  }

  getGameColor(game: Game) : string {
    if(game.score1 != null)
      return 'grey';
    else if (game.bet > 0)
      return 'black';
    else
      return 'red';
  }

  selectGame(game: Game) : void {
    this.errorMessage = null;
    this.selectedGame = game;
    this.betService.getBetByUser(this.currentUser.id).subscribe(data => {
        this.bet = data.filter(x => x.game.id == this.selectedGame.id)[0] }
      , err => {
        this.errorMessage = err.error;
      });
  }

  deleteGame() : void {
    this.gameService.deleteGame(this.selectedGame.id).subscribe(data => {
      this.gameList = this.gameList.filter(x => x.id != this.selectedGame.id);
      this.selectedGame = null;
      this.router.navigate(['/game-details'])
      , err => {
      this.errorMessage = err.error;
      }
    });
  }

  openGameScoreDialog(): void {
    this.scoreBuf = new ScoreBuffer();
    this.scoreBuf.score1 = this.selectedGame.score1;
    this.scoreBuf.score2 = this.selectedGame.score2;

    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      width: '250px',
      data: { scoreBuf: this.scoreBuf }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedGame.score1 = this.scoreBuf.score1;
        this.selectedGame.score2 = this.scoreBuf.score2;
        this.gameService.updateGame(this.selectedGame).subscribe(data => data
          , err => {
            this.errorMessage = err.error;
          });
      }
    });
  }

  openBetScoreDialog(): void {
    this.scoreBuf = new ScoreBuffer();
    if (this.bet != null) {
      this.scoreBuf.score1 = this.bet.score1;
      this.scoreBuf.score2 = this.bet.score2;
    }

    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      width: '250px',
      data: { scoreBuf: this.scoreBuf }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.bet != null) {
          this.bet.score1 = this.scoreBuf.score1;
          this.bet.score2 = this.scoreBuf.score2;
          this.betService.updateBet(this.bet).subscribe(data => data
            , err => {
              this.errorMessage = err.error;
            });
        } else {
          this.bet = new Bet();
          this.bet.game = this.selectedGame;
          this.bet.user = this.currentUser;
          this.bet.score1 = this.scoreBuf.score1;
          this.bet.score2 = this.scoreBuf.score2;
          this.betService.newBet(this.bet).subscribe(data => {
              this.bet.id = data.id;
              this.selectedGame.bet = data.id;
            }, err => {
              this.errorMessage = err.error;
            }
          );
        }
      }
    });
  }

  openDeleteDialog(): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteGame();
    });
  }
}

@Component({
  selector: 'score-dialog',
  templateUrl: 'score-dialog.component.html',
})
export class ScoreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
