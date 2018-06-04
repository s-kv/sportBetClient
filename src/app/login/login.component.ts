import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../model/user";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  errorMessage : string;
  constructor(private authService :AuthService, private router: Router) { }

  login(){
    this.authService.logIn(this.user)
        .subscribe(data=>{
              this.router.navigate(['/profile']);
            }, err=>{
              this.errorMessage="Ошибка :  Неверное имя пользователя или пароль!";
            }
        )
  }
}
