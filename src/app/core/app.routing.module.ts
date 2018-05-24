import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "../user/user.component";
import { LoginComponent } from "../login/login.component";
import {UrlPermission} from "../urlPermission/url.permission";

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [UrlPermission] },
  { path: 'user', component: UserComponent, canActivate: [UrlPermission] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
