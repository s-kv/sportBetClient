import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material';
import { User } from "../model/user";
import { UserService } from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['id', 'userName', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<User>();

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
}
