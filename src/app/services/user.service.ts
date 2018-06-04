import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AppComponent} from "../app.component";
import {User} from "../model/user";
import {map} from "rxjs/internal/operators/map";

@Injectable()
export class UserService {
  private static API_URL = AppComponent.API_URL + '/users';

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(UserService.API_URL).pipe(
      map(users => users)
      );
  }
}
