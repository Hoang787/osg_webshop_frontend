import {Component, ElementRef, OnInit, viewChild } from '@angular/core';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {CategoryService} from '../Services/CategoryService';
import {Category} from '../Class/Category';
import {CommonModule} from '@angular/common';
import {ProductVisitedService} from '../Services/ProductVisitedService';


@Component({
  imports: [HeaderComponent, FooterComponent, CommonModule],
  selector: 'app-productGeneral',
  standalone: true,
  styleUrl: './app.component.productGeneral.css',
  templateUrl: './app.component.productGeneral.html'
})
export class ProductGeneralComponent implements OnInit {

    categories: Category[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productVisitedService: ProductVisitedService) {
    }


    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe(listCategories => {

          this.categories = listCategories;
          console.log(this.categories);
        });

        this.productVisitedService.clear();
    }


    productCategory(categ: any) {

       console.log(categ);
       this.router.navigate(["product", categ.category]);
    }

}
