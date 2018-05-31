import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../model/game";
import {GameService} from "../../services/game.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  private selectedGame: Game;
  private editedGame: Game;
  private gameList: Game[];
  private errorMessage: string;

  constructor(private gameService: GameService,
              public router: Router,
              private dialog: MatDialog) { }

  ngOnInit() : void {
    this.gameService.getGames().subscribe(data => {
      console.log(data);
      this.gameList = data;
    }, err => {
      console.log(err);
      // this.errorMessage = err;
    });
  }

  deleteGame() : void {
    this.gameService.deleteGame(this.selectedGame.id).subscribe(data => {
      this.gameList = this.gameList.filter(x => x.id != this.selectedGame.id);
      this.selectedGame = null;
      this.router.navigate(['/game-details'])
      , err => {
      this.errorMessage = err;
      }
    });
  }

  openDialog(): void {
    this.editedGame = new Game();
    this.editedGame.score1 = this.selectedGame.score1;
    this.editedGame.score2 = this.selectedGame.score2;

    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      width: '250px',
      data: { selectedGame: this.editedGame }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedGame.score1 = this.editedGame.score1;
        this.selectedGame.score2 = this.editedGame.score2;
        this.gameService.updateGame(this.selectedGame).subscribe(data => data
          , err => {
            this.errorMessage = err;
          });
      }
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
