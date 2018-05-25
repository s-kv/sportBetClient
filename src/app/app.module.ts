import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CustomMaterialModule } from "./core/material.module";
import { AppRoutingModule } from "./core/app.routing.module";

import { UserService } from './user/user.service';
import { UrlPermission } from "./urlPermission/url.permission";
import { AuthService } from "./services/auth.service";
import { AccountService } from "./services/account.service";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService, UrlPermission, AuthService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
