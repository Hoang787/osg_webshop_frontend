import {Component, ElementRef, HostListener, OnInit, signal, ViewChild, viewChild} from '@angular/core';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {CommonModule, NgForOf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MultiSelect} from 'primeng/multiselect';
import {Chip} from 'primeng/chip';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {ScrollTop} from 'primeng/scrolltop';
import {ProductService} from '../Services/ProductService';
import {CategoryService} from '../Services/CategoryService';
import {Filter_Selected} from '../Class/Filter_Selected';
import {Filter_Selected_Categ} from '../Class/Filter_Selected_Categ';
import {Category} from '../Class/Category';
import {ProductVisitedService} from '../Services/ProductVisitedService';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Popover, PopoverModule} from 'primeng/popover';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {FiltersService} from '../Services/FiltersService';
import {Message} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {DataView, DataViewModule} from 'primeng/dataview';
import {SelectButtonModule} from 'primeng/selectbutton';




@Component({
  imports: [PaginatorModule, CommonModule, MatButtonModule, HeaderComponent, FooterComponent, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, FormsModule, MultiSelect, ScrollTop, Chip, ProgressSpinner, Popover, InputTextModule, Message, DataViewModule, SelectButtonModule, PopoverModule],
  selector: 'app-product',
  standalone: true,
  styleUrl: './app.component.products.css',
  templateUrl: './app.component.products.html',
  providers: [MessageService]
})
export class ProductComponent implements OnInit {

  @ViewChild("filterContent") menuFilter!: ElementRef;
  @ViewChild("pop") pop!: Popover;
  @ViewChild("inputHoleDepth") inputHoleDepth! : ElementRef;
  @ViewChild("ms") multiSelect! : ElementRef;
  @ViewChild("features") features! : Popover;

  category!: Category;
  categories: Category[] = [];
  categ: string = '';
  productIdsCopmpiere: any[] = [];
  currentPage: number = 0;
  rows: number = 100;
  totalRecords: number = 0;
  tableProducts: any[] = [];
  filtersSelected: Filter_Selected[] = [];
  filtersSelectedCateg: any;


  currentUrlArray: string[] = [];
  currentUrl: string = '';

  visible: boolean = true;
  listFilters: any;
  listFiltersByCriterias: any;

  productsVisited: any[] = [];
  loading = false;

  criteriaSelected: any;
  orderCriterias: any[] = [];
  holeDepth!: any;
  holeDepthFormat: boolean = false;

  options: any[] = ['list', 'grid'];
  layout: any = "list";

  selectedProduct: any;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private categoryService: CategoryService,
              private productVisitedService: ProductVisitedService, private element: ElementRef, private filtersService: FiltersService,  private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.categ = this.route.snapshot.paramMap.get('categ')!;

    this.loading = true;
    console.log(this.categ);
    this.getCategory(this.categ);
    this.getRouteName();
    this.filtersSelectedCateg = new Filter_Selected_Categ(this.categ, this.currentPage, this.rows);


       if(this.filtersService.isSaved()) {

          this.listFilters = this.filtersService.getFilterSelected();
          this.filtersService.setFiltersSaved(false);

          this.filterProductsAfterDetails();
         console.log(this.listFilters);
       }
       else
       {
         this.productService.getFilters(this.categ).subscribe(data => {
         this.listFilters = data;
         this.listFilters = this.filtersService.getFiltersByCateg(this.listFilters);

           this.productService.getProducts(this.categ).subscribe(products => {
             this.tableProducts = products.list_products;
             this.totalRecords = products.countByCategory;

             if (this.categ.toLowerCase() !== "Gauges".toLowerCase()) {
               for (let product of this.tableProducts) {
                 product.materials.material_name = product.materials.material_name.split(',');
               }
             }

             this.loading = false;

             console.log(this.listFilters);
             console.log(this.tableProducts);
           });

        });
       }

    this.productsVisited = this.productVisitedService.getProductVisited();
    console.log(this.productsVisited);

  }


  getRouteName(): void {
    this.currentUrl = this.route.snapshot.url.join('/');
    this.currentUrlArray = this.currentUrl.split('/');
    console.log(this.currentUrlArray);
  }


  getCategory(categ: any): void {
     this.categoryService.getCategory(categ).subscribe(category => {
        this.category = category;
        console.log(this.category.category);
     })
  }

  getAllCategories(): void {
     this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
        console.log(this.categories);
     })
  }


  navigateToCateg(categ: any) {

     console.log(categ);
     this.router.navigate(["product", categ.category]).then(() => {
        window.location.reload();
     });
  }


  filterProductsAfterDetails() {

    console.log(this.filtersSelectedCateg);
    this.filtersSelected = [];

    for(let filter of this.listFilters) {

      if((filter.name == "Material" || filter.name == "Type Tap" || filter.name == "Hole Type Application")  && (filter.selected)) {

        console.log("yop");

        let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
        filter_selected.name = filter.name;

        for(let selectedOpt of filter.selected) {
          filter_selected.filterSelected.push(selectedOpt.name);
        }


        this.filtersSelected.push(filter_selected);
      }


      if((filter.name !== "Material" && filter.name !== "Type Tap" && filter.name !== "Hole Type Application") && (filter.selected)) {

        let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
        filter_selected.name = filter.name;
        for (let selectedOpt of filter.selected) {
          filter_selected.filterSelected.push(selectedOpt);
        }

        this.filtersSelected.push(filter_selected);
      }


      if(filter.name == "Hole Depth") {

        let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
        filter_selected.name = filter.name;

        if(this.holeDepth && this.holeDepth !== "") {
          filter_selected.filterSelected.push(this.holeDepth.toString());
        } else {
          console.log("Hole Depth selected");
          filter_selected.filterSelected = [];
        }

        this.filtersSelected.push(filter_selected);
      }

      this.filtersSelectedCateg.filters_Selected = this.filtersSelected;
    }


    this.loading = true;

    console.log(this.filtersSelectedCateg);

       this.productService.getProductByFilters(this.filtersSelectedCateg).subscribe(products => {
         this.tableProducts = products.list_products;
         this.totalRecords = products.countByCategory;

         for(let product of this.tableProducts) {
           product.materials.material_name = product.materials.material_name.split(',');
         }

         this.loading = false;

         console.log(this.totalRecords);
         console.log(this.tableProducts);

       })
  }


  filterProducts(filter: any) {

    this.filtersSelected = [];

    if(filter.name && filter.name != "Hole Depth") {
      this.markedSelected(filter);
    }
    else {
      let regexp = /^[0-9]{1,3}(\.[0-9]{0,2})?$/;
      console.log(regexp.test(filter.target.value));

      if (filter.target.value && regexp.test(filter.target.value)) {

        this.holeDepthFormat = false;
      }
      else if (filter.target.value && !regexp.test(filter.target.value)) {
        this.inputHoleDepth.nativeElement.value = "";
        this.holeDepth = "";
        this.holeDepthFormat = true;
        return;
      }
      else {
        console.log("No Value for Hole Depth");
        this.inputHoleDepth.nativeElement.value = "";
        this.holeDepth = "";
        this.holeDepthFormat = false;
      }
    }

    console.log(filter);

     for(let filter of this.listFilters) {

         if((filter.name == "Material" || filter.name == "Type Tap" || filter.name == "Hole Type Application")  && (filter.selected)) {

           console.log("yop");

           let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
           filter_selected.name = filter.name;

           for(let selectedOpt of filter.selected) {
             filter_selected.filterSelected.push(selectedOpt.name);
           }

           this.filtersSelected.push(filter_selected);
         }

         if((filter.name !== "Material" && filter.name !== "Type Tap" && filter.name !== "Hole Type Application") && (filter.selected)) {

           let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
           filter_selected.name = filter.name;
           for (let selectedOpt of filter.selected) {
             filter_selected.filterSelected.push(selectedOpt);
           }

           this.filtersSelected.push(filter_selected);
         }

         if(filter.name == "Hole Depth") {

           let filter_selected: Filter_Selected = new Filter_Selected("OSG", []);
           filter_selected.name = filter.name;

           if(this.holeDepth && this.holeDepth !== "") {
             filter_selected.filterSelected.push(this.holeDepth.toString());
           } else {
             console.log("Hole Depth selected");
             filter_selected.filterSelected = [];
           }

           this.filtersSelected.push(filter_selected);
         }

         this.filtersSelectedCateg.filters_Selected = this.filtersSelected;
     }

    this.loading = true;

    console.log(this.filtersSelectedCateg);
    this.getFiltersBySelected(this.filtersSelectedCateg);

     this.productService.getProductByFilters(this.filtersSelectedCateg).subscribe(products => {
         this.tableProducts = products.list_products;
         this.totalRecords = products.countByCategory;

       for(let product of this.tableProducts) {
         product.materials.material_name = product.materials.material_name.split(',');
       }

         this.loading = false;

         console.log(this.totalRecords);
         console.log(this.tableProducts);

     })
  }



  getFiltersBySelected(filtersSelectByUser: any): void {

    this.productService.getFiltersByCriterias(filtersSelectByUser).subscribe(data =>  {

      this.listFiltersByCriterias = data;

      console.log(this.listFilters);
      console.log(this.listFiltersByCriterias);

      for(let actualFilter of this.listFilters) {

        for(let newFilter of this.listFiltersByCriterias) {

          if (actualFilter.name.toLowerCase() == newFilter.name.toLowerCase()) {
            actualFilter.options = newFilter.options;
            console.log(this.listFilters);
          }
        }
      }

      this.listFilters = this.filtersService.getFiltersByCateg(this.listFilters);

    });

  }


  onPageChange(event: PaginatorState) {


    this.currentPage = event.page ?? 0;
    console.log(this.currentPage);
    console.log(this.filtersSelectedCateg);
    this.rows = event.rows ?? 100;


      this.filtersSelectedCateg.currentPage = this.currentPage;
      this.filtersSelectedCateg.size = this.rows;


    this.getFiltersBySelected(this.filtersSelectedCateg);

    this.productService.getProductByFilters(this.filtersSelectedCateg).subscribe(productsByPage => {
      this.tableProducts = [];
      this.tableProducts = productsByPage.list_products;
      this.totalRecords = productsByPage.countByCategory;

      for(let product of this.tableProducts) {
        product.materials.material_name = product.materials.material_name.split(',');
      }

      window.scroll({
        top: 0,
        left: 0,
      });
      console.log(this.tableProducts);
      }
    );
  }


  navigateTo(path:any) {

    let relativeRoute: any = this.route.snapshot.url;
    let currentRoute: any = "";
    let index: any = 0;

    while(relativeRoute[index].path != path) {
      console.log(relativeRoute[index].path);
      currentRoute += relativeRoute[index].path + "/";
      index++;
    }

    currentRoute += path;

    this.router.navigate([currentRoute]).then();
  }


  @HostListener('document:scroll', ['$event'])
  pageScroll(e: any) {
    if (window.scrollY > 500) {
      this.menuFilter.nativeElement.style.position = 'sticky';
      this.menuFilter.nativeElement.style.top = 0;
      this.menuFilter.nativeElement.style.setProperty('z-index', 100);
    }
  }



  toggleDrawer() {
    this.visible = !this.visible;
  }


  displayFeatures(event: any, product: any) {
    console.log(event);
    console.log(product);

    this.selectedProduct = product;
    console.log(this.selectedProduct);

    if(this.selectedProduct == null) {
      this.features.hide();

    } else {
      this.features.show(event);
    }
  }


  hideFeatures() {
    this.features.hide();
  }



  removeFilter(filter: any, opt: any) {

    if(filter.name == "Material" || filter.name == "Type Tap" || filter.name == "Hole Type Application") {

      console.log(this.listFilters);
      console.log(opt);

      for (let filterSpec of this.listFilters) {
        if (filterSpec.name === filter.name) {
          filterSpec.selected = filterSpec.selected.filter((selectedOpt: any) => selectedOpt.name !== opt);
        }
      };

          console.log(filter);
          console.log(this.filtersSelectedCateg.filters_Selected);

          for(let option of this.filtersSelectedCateg.filters_Selected) {
             if(option.name === filter.name) {
               option.filterSelected = option.filterSelected.filter((optFilter: any) => optFilter !== opt);
             }
          }

          this.markedSelected(filter);
          this.loading = true;

          this.getFiltersBySelected(this.filtersSelectedCateg);

          this.productService.getProductByFilters(this.filtersSelectedCateg).subscribe(productsByPage => {
            this.tableProducts = [];
            this.tableProducts = productsByPage.list_products;
            this.totalRecords = productsByPage.countByCategory;

            for(let product of this.tableProducts) {
              product.materials.material_name = product.materials.material_name.split(',');
            }

            this.loading = false;
          });

    } else {

      for (let filterSpec of this.listFilters) {
        if (filterSpec.name === filter.name) {
          filterSpec.selected = filterSpec.selected.filter((selectedOpt: any) => selectedOpt !== opt);
        }
      };

      console.log(filter);
      for(let option of this.filtersSelectedCateg.filters_Selected) {
        if (option.name === filter.name) {
          option.filterSelected = option.filterSelected.filter((optFilter: any) => optFilter !== opt);
        }
      };

      this.markedSelected(filter);
      this.loading = true;

      this.getFiltersBySelected(this.filtersSelectedCateg);

      this.productService.getProductByFilters(this.filtersSelectedCateg).subscribe(productsByPage => {
        this.tableProducts = [];
        this.tableProducts = productsByPage.list_products;
        this.totalRecords = productsByPage.countByCategory;

        for(let product of this.tableProducts) {
          product.materials.material_name = product.materials.material_name.split(',');
        }

        console.log(this.tableProducts);
        this.loading = false;

      });
    }
  }


  productDetails(product: any) {

    this.filtersService.saveFilterSelected(this.listFilters);

    console.log(this.filtersService.getFilterSelected());
    console.log(this.productsVisited);

    if(this.productsVisited.length == 0) {
         this.productVisitedService.setProductVisited(product);
    } else {

      if (this.productsVisited.findIndex(p =>  p.sku == product.sku) == -1 && this.productsVisited.length < 8) {

        this.productVisitedService.setProductVisited(product);
      }

      if (this.productsVisited.findIndex(p =>  p.sku == product.sku) == -1 && this.productsVisited.length == 8) {

        this.productVisitedService.addProductVisited(product);
      }

    }

    this.router.navigate([product.sku], { relativeTo : this.route });
  }


  markedSelected(filter: any) {

    console.log(filter);
    let multiselect  = document.getElementById(filter.id);
    console.log(multiselect);

    if(filter?.selected.length > 0) {

      console.log(multiselect);

      multiselect?.style.setProperty("background-color", "#00559d");
    } else {
      multiselect?.style.setProperty("background-color", "#ffffff");
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    console.log(event);

    this.orderCriterias = [
      "Material",
      "Family",
      "Price Low To High",
      "Price High To Low",
      "Review"
    ];
  }

  togglePopUp(event: any) {
    this.holeDepthFormat = false;
    this.pop.toggle(event);
  }


}
