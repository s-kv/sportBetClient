import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AppComponent} from "../app.component";
import {Team} from "../model/team";
import {map} from "rxjs/internal/operators/map";

@Injectable()
export class TeamService {
  private static API_URL = AppComponent.API_URL + '/teams';

  constructor(private http: HttpClient) {
  }

  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(TeamService.API_URL + '/' + id);
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(TeamService.API_URL).pipe(
      map(teams => teams.map(x =>
        {
          x.imageURL = TeamService.getImageUrl(x.imageURL);
          return x;
        })
      )
    );
  }

  public newTeam(team: Team) {
    team.imageURL = TeamService.prepareImageUrl(team.imageURL);
    return this.http.post(TeamService.API_URL, team).pipe(
      map(response => response)
    );
  }

  public deleteTeam(id: number) {
    return this.http.delete(TeamService.API_URL + '/' + id).pipe(
      map(response => response)
    );
  }

  public getFlags(): Observable<string[]> {
    return this.http.get<string[]>(TeamService.API_URL + '/flags').pipe(
      map(strings => strings.map(x => TeamService.getImageUrl(x)))
    );
  }

  public static getImageUrl(filename : string) : string {
    return AppComponent.API_URL + '/' + filename;
  }

  private static prepareImageUrl(url : string) : string {
    return '/images' + url.substring(url.lastIndexOf('/'));
  }

}
