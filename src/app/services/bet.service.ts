import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from "../app.component";
import {Observable} from "rxjs/index";
import {Bet} from "../model/bet";
import {map} from "rxjs/internal/operators/map";
import {TeamService} from "./team.service";

@Injectable()
export class BetService {
  private API_URL = AppComponent.API_URL + '/bets';

  constructor(private http:HttpClient) {
  }

  public getBet(id: number): Observable<Bet> {
    return this.http.get<Bet>(this.API_URL + '/' + id);
  }

  public getBetByUser(id: string): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.API_URL + '/user/' + id).pipe(
      map(bets => bets.map(x =>
        {
          x.game.team1.imageURL = TeamService.getImageUrl(x.game.team1.imageURL);
          x.game.team2.imageURL = TeamService.getImageUrl(x.game.team2.imageURL);
          return x;
        })
      )
    );
  }

  public newBet(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.API_URL, bet);
  }

  public updateBet(bet: Bet) {
    console.log(bet);
    return this.http.put(this.API_URL + '/' + bet.id, bet).pipe(
      map(response => response)
    );
  }

  public deleteBet(id: number) {
    return this.http.delete(this.API_URL + '/' + id).pipe(
      map(response => response)
    );
  }
}
