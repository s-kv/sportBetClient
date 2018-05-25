import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "../model/user";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  confirmPassword : string;

  constructor(public accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.user.password != this.confirmPassword) {
      this.errorMessage = 'Пароль не подтвержден!';
    } else {
      this.accountService.createAccount(this.user).subscribe(data => {
            this.router.navigate(['/login']);
          }, err => {
            console.log(err);
            this.errorMessage = err;
          }
      )
    }
  }
}
