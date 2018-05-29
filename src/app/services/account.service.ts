import { Injectable } from '@angular/core';
import { User } from "../model/user";
import { Http } from "@angular/http";
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppComponent } from "../app.component";

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  createAccount(user : User){
    return this.http.post(AppComponent.API_URL + '/account/register',user)
      .pipe(map(resp=>resp.json()));
  }
}
