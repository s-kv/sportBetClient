import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators/map";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    let authReq = req;

    if (localStorage.getItem('currentUser')) {
      // let user : User = JSON.parse(localStorage.getItem('currentUser'));
      //let headers = new Headers();
      // creating base64 encoded String from user name and password
      // var base64Credential: string = btoa(user.username + ':' + user.password);
      // req.headers.set("Authorization", "Basic " + base64Credential);
      authReq = req.clone({ headers: req.headers.set("Authorization", "Basic " + localStorage.getItem('currentUserBase64Credential'))});
    }

    return next.handle(authReq).pipe(
      map(
        (err: any) => {
          console.log(JSON.stringify(err));
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
          return err;
        })
      );
  }
}

