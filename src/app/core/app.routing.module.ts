import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {UrlPermission} from "../urlPermission/url.permission";
import {ProfileComponent} from "../profile/profile.component";
import {RegisterComponent} from "../register/register.component";
import {NewTeamComponent} from "../new-team/new-team.component";
import {NewGameComponent} from "../game/new-game/new-game.component";
import {GameDetailsComponent} from "../game/game-details/game-details.component";
import {RulesComponent} from "../rules/rules.component";

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [UrlPermission] },
  { path: 'new-team', component: NewTeamComponent, canActivate: [UrlPermission] },
  { path: 'new-game', component: NewGameComponent, canActivate: [UrlPermission] },
  { path: 'game-details', component: GameDetailsComponent, canActivate: [UrlPermission] },
  { path: 'rules', component: RulesComponent, canActivate: [UrlPermission] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
