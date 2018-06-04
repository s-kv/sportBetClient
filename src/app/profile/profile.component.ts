import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Bet} from "../model/bet";
import {BetService} from "../services/bet.service";
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  private selectedUser: User;
  private userList: User[];
  private betList: Bet[];
  private errorMessage: string;

  displayedColumns = ['id', 'team1', 'team2', 'gameScore', 'betScore', 'userPoints'];
  dataSource = new MatTableDataSource<Bet>();

  constructor(private userService: UserService,
              private betService: BetService,
              public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() : void {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    }, err => {
      console.log(err);
      // this.errorMessage = err;
    });
  }

  selectUser(user: User) : void {
    this.errorMessage = null;
    this.selectedUser = user;
    this.betService.getBetByUser(this.currentUser.id).subscribe(data => {
        this.betList = data;
        this.dataSource.data = data;}
      , err => {
        this.errorMessage = err.error;
      });
  }
}
