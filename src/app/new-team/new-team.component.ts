import {Component, OnInit} from '@angular/core';
import {Team} from "../model/team";
import {UploadFileService} from "../services/upload-file.service";
import {TeamService} from "../services/team.service";
import {Router} from "@angular/router";

@Component({
  selector: 'new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  private team: Team = new Team();
  private errorMessage: string;
  private flagList: string[];

  constructor(private teamService: TeamService,
              private uploadService: UploadFileService,
              public router: Router) { }

  ngOnInit() : void {
    this.teamService.getFlags().subscribe(data => {
        this.flagList = data;
      }, err => {
        console.log(err);
        // this.errorMessage = err;
    })
  }

  public getFlagName(url : string) : string {
    return url.substring(url.indexOf('images')+'images'.length+1, url.lastIndexOf('.'));
  }

  public newTeam() {
    this.teamService.newTeam(this.team).subscribe(data => {
        this.router.navigate(['/new-game']);
      }, err => {
        console.log(err);
        this.errorMessage = err;
      }
    )
  }
}
