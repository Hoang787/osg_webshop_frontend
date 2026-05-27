import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://localhost:8080/osgwebshop/";


  constructor(private http: HttpClient) {

  }


  getAllCategories(): Observable<any> {

    const httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set("Content-Type", "application/json");

    return this.http.get(this.apiUrl + "category", { headers: httpHeaders});
  }


  getCategory(categ: any): Observable<any> {

    console.log(categ);
    const httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set("Content-Type", "application/json");

    return this.http.get(this.apiUrl + "category/" + categ, { headers: httpHeaders});
  }


  getSpecsByCategory(categ: any): Observable<any> {

     let httpHeaders: HttpHeaders = new HttpHeaders();
     httpHeaders = httpHeaders.set("Content-Type", "application/json");

     return this.http.get(this.apiUrl + "category/specifications/" + categ, { headers: httpHeaders});
  }




}
