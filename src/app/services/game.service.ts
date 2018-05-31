import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AppComponent} from "../app.component";
import {Game} from "../model/game";
import {map} from "rxjs/internal/operators/map";
import {TeamService} from "./team.service";

@Injectable()
export class GameService {
  private API_URL = AppComponent.API_URL + '/games';

  constructor(private http: HttpClient) {
  }

  public getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.API_URL + '/' + id);
  }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URL).pipe(
      map(games => games.map(x =>
        {
          x.team1.imageURL = TeamService.getImageUrl(x.team1.imageURL);
          x.team2.imageURL = TeamService.getImageUrl(x.team2.imageURL);
          return x;
        })
      )
    );
  }

  public newGame(game: Game) {
    return this.http.post(this.API_URL, game).pipe(
      map(response => response)
    );
  }

  public updateGame(game: Game) {
    console.log(game);
    return this.http.put(this.API_URL + '/' + game.id, game).pipe(
      map(response => response)
    );
  }

  public deleteGame(id: number) {
    return this.http.delete(this.API_URL + '/' + id).pipe(
      map(response => response)
    );
  }
}
