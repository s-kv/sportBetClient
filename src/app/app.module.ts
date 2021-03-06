import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CustomMaterialModule} from "./core/material.module";
import {AppRoutingModule} from "./core/app.routing.module";

import {UrlPermission} from "./urlPermission/url.permission";
import {AuthService} from "./services/auth.service";
import {AccountService} from "./services/account.service";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {NewTeamComponent} from "./new-team/new-team.component";
import {TeamService} from "./services/team.service";
import {UploadFileService} from "./services/upload-file.service";
import {Interceptor} from "./core/app.interceptor";
import {NewGameComponent} from "./game/new-game/new-game.component";
import {GameService} from "./services/game.service";
import {
  GameDetailsComponent, ScoreDialogComponent,
  DeleteDialogComponent
} from "./game/game-details/game-details.component";
import {BetService} from "./services/bet.service";
import {UserService} from "./services/user.service";
import {RulesComponent} from "./rules/rules.component";
import {ErrorHandler} from "protractor/built/exitCodes";
import {GlobalErrorHandler} from "./core/error.interceptor";
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    NewTeamComponent,
    NewGameComponent,
    GameDetailsComponent,
    ScoreDialogComponent,
    RulesComponent,
    DeleteDialogComponent
  ],
  entryComponents: [ScoreDialogComponent, DeleteDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UrlPermission, AuthService, AccountService, TeamService, GameService, BetService, UploadFileService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide : LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
