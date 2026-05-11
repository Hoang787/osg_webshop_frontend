import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Filter_Selected} from '../Class/Filter_Selected';
import {Filter_Selected_Categ} from '../Class/Filter_Selected_Categ';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = "http://localhost:8080/osgwebshop/";

  constructor(private http: HttpClient) {

  }


  getProductById(categ: any, sku: any): Promise<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    console.log("proceed");
    return new Promise((resolve: any, reject: any) => {

      try {

        this.http.get(this.apiUrl + "product" + "/" + categ.toLowerCase() + "/" + sku, {headers: httpHeaders}).subscribe(resp => {
          resolve(resp);
        });
      } catch (error) {
         reject(error);
      }

    });



  }



  getProducts(categ: any): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    return this.http.get(this.apiUrl + "product/" + categ.toLowerCase() , { headers: httpHeaders});
  }


  getProductsBySearch(filtersCateg: any): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    let httpBody = JSON.stringify(filtersCateg);

    return this.http.post(this.apiUrl  + "product/search", httpBody, { headers: httpHeaders});
  }


  getProductBySearchSku(sku: any) : Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    return this.http.get(this.apiUrl + "product/search/" + sku, {headers: httpHeaders});
  }


  getFilters(categ: any): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

     return this.http.get(this.apiUrl + "product/" + categ.toLowerCase() + "/filters", { headers: httpHeaders})
  }

  getFiltersByCriterias(criterias: Filter_Selected_Categ): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    let httpBody = JSON.stringify(criterias);
    console.log(httpBody);

    return this.http.post(this.apiUrl + "product/" + criterias.category.toLowerCase() + "/filterByCriterias", httpBody, {headers: httpHeaders});
  }

  getProductByFilters(criterias: Filter_Selected_Categ): Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    let httpBody = JSON.stringify(criterias);
    console.log(httpBody);

    return this.http.post(this.apiUrl + "product/" + criterias.category.toLowerCase() + "/filter", httpBody, {headers: httpHeaders});
  }


  getSuggestions(suggestions: any) : Observable<any> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    let httpBody = JSON.stringify(suggestions);
    console.log(httpBody);

    return this.http.post(this.apiUrl + "product/" + suggestions.category.toLowerCase() + "/suggestions", httpBody, {headers: httpHeaders});
  }


  getProductByCompare(listSku: any, category: any) {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Content-Type", "application/json");

    let httpBody = JSON.stringify(listSku);
    console.log(category);

    return this.http.post(this.apiUrl  + "product/" + category.toLowerCase() + "/compare", httpBody, { headers: httpHeaders});
  }


}
