import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "http://localhost:8080/osgwebshop";

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl + "/home/hello", { responseType: 'text'});
  }

  postdata(employee: any): Observable<any> {

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json' };
    return this.http.post<any>(this.apiUrl + "/home/adduser", employee, { headers });
  }

  login(user: any): Observable<any> {

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json' };
    return this.http.post<any>(this.apiUrl + "/auth/login", user, { headers });
  }

  confirmLangguage(selectedLanguage: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept-Language': selectedLanguage,
      'Accept': 'application/json' };
    console.log(headers);
    return this.http.post<any>(this.apiUrl + "/home/language", selectedLanguage, { headers });
  }


  downloadFile(fileInfo: any): Observable<Blob> {

    console.log(fileInfo.path);
    let fileToDownload = "assets/" + fileInfo.path;

    return this.http.get(fileToDownload, { responseType: 'blob' });
  }


  getLastVideos(): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    return this.http.get(this.apiUrl + "/videos", {headers: httpHeaders});
  }

}
