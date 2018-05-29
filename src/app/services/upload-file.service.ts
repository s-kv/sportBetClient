import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AppComponent} from "../app.component";
import {map} from "rxjs/internal/operators/map";

@Injectable()
export class UploadFileService {
  private API_URL = AppComponent.API_URL + '/files';

  constructor(private http: HttpClient) {}

  public pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.API_URL, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getFile(filename: string): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/' + filename);
  }
}
