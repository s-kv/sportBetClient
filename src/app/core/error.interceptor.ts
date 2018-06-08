import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error) {
    this.router.navigate(['/login']);
    //throw error;
  }
}
