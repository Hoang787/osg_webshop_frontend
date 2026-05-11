import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductVisitedService {

  private apiUrl = "http://localhost:8080/osgwebshop";

  private listProductVisited: any[] = [];

  constructor(private http: HttpClient) {
  }


  setProductVisited(product: any): void {
    this.listProductVisited.unshift(product);
  };


  saveProductvisitedList(products: any) {
    this.listProductVisited = products;
  }


  getProductVisited(): any[] {
    return this.listProductVisited;
  }


  addProductVisited(product: any) {
     this.listProductVisited.pop();
     this.listProductVisited.unshift(product);
  }


  clear(): void {
    this.listProductVisited = [];
  };


  getProductVisitedById(categ: any, sku: any): Promise<any> {

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

}
