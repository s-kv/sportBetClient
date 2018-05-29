import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import {Team} from "../model/team";
import {UploadFileService} from "../services/upload-file.service";
import {Observable} from "rxjs/index";
import {TeamService} from "../services/team.service";
import {Router} from "@angular/router";

@Component({
  selector: 'new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  private team: Team = new Team();
  // private currentFileUpload: File;
  // private selectedFiles: FileList;
  // private progress: { percentage: number } = { percentage: 0 };

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
        this.errorMessage = err;
    })
  }

  public getFlagName(url : string) : string {
    return url.substring(url.indexOf('images')+'images'.length+1, url.lastIndexOf('.'));
  }

  public newTeam() {
    this.teamService.newTeam(this.team).subscribe(data => {
        this.router.navigate(['/profile']);
      }, err => {
        console.log(err);
        this.errorMessage = err;
      }
    )
  }

  // public selectFile(event) {
  //   const file = event.target.files.item(0);
  //
  //   if (file.type.match('image.*')) {
  //     this.selectedFiles = event.target.files;
  //   } else {
  //     alert('invalid format!');
  //   }
  // }
  //
  // public upload() {
  //   this.progress.percentage = 0;
  //
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       this.uploadService.getFile(event.body.toString()).subscribe(event => {
  //         this.team.imageURL = event.body.toString();
  //       })
  //
  //       console.log('File is completely uploaded! Filename = ' + this.team.imageURL);
  //     }
  //   });
  //
  //   this.selectedFiles = undefined;
  // }
}
