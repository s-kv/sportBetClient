import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/index";

import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {
  }

  private baseUrl:string = 'http://localhost:8080/api/users';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public createUser(user:User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // public deleteUser(user) {
  //   return this.http.delete(this.userUrl + "/"+ user.id);
  // }
}
