import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, viewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';
import {TabsModule} from 'primeng/tabs';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Popover} from 'primeng/popover';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Footer, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Dialog} from 'primeng/dialog';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {ScrollTop} from 'primeng/scrolltop';
import {ProductService} from '../Services/ProductService';
import {CategoryService} from '../Services/CategoryService';
import {SpecificationsService} from '../Services/SpecificationsService';
import {Product_Images} from '../Class/Product_Images';
import {Fieldset} from 'primeng/fieldset';
import {ProductVisitedService} from '../Services/ProductVisitedService';
import {Suggestion} from '../Class/Suggestion';
import {ProductFiles} from '../Class/ProductFiles';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {DataService} from '../Services/DataService';
import {Image} from 'primeng/image';
import {Material} from '../Class/Material';
import {Carousel} from 'primeng/carousel';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {PickListComponent} from '../PickListComponent/app.component.picklist';
import {CompareService} from '../Services/CompareService';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {ProgressSpinner} from 'primeng/progressspinner';




@Component({
  imports: [HeaderComponent, FooterComponent, NgForOf, GalleriaModule, TabsModule, TableModule, InputGroup, InputGroupAddon, Popover, Button, InputText, FormsModule, Toast, Dialog, ScrollTop, Fieldset, NgxDocViewerModule, NgxImageZoomModule, Carousel, Image, ProgressSpinner],
  selector: 'app-details-product',
  standalone: true,
  styleUrl: './app.component.productDetails.css',
  templateUrl: './app.component.productDetails.html',
  providers: [DialogService, MessageService]
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;

  panelOpenState: boolean = false;
  productId: any;
  images: any[] = [];
  drawings: any[] = [];
  productImages: Product_Images[] = [];
  prodMaterial: any[] = [];
  prodMaterialNames: any[] = [];
  cuttingSpeeds: any[] = [];
  prodApplicationMaterial: any[] = [];
  category: any;
  product!: any;
  specifications: any;
  currentUrlArray: string[] = [];
  currentUrl: string = '';
  quantity:  any = 1;
  visible: boolean = false;
  productsVisited: any[] = [];
  showing: boolean = false;
  sourcePDF: any;
  sourceDXF: any;
  sourceSTP: any;
  sourceFile: any;
  features: any;

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '912px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '820px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '658px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '360px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '344px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '320px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  suggestions: any;
  tableSuggestions: any[] = [];

  ref: DynamicDialogRef | undefined;
  productsCompare: any;
  productsToCompare: any = [];
  criteriasToCompare: any[] = [];
  productsToSelectForCompare: any[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private productService: ProductService, public dialogService: DialogService,
              private categoryService: CategoryService, private specsService: SpecificationsService, private productVisitedService: ProductVisitedService, private dataServices: DataService, private compareService: CompareService) {
  }

    ngOnInit(): void {

      this.category = this.route.snapshot.paramMap.get('categ')!;
      this.productId = this.route.snapshot.paramMap.get('id')!;

      console.log(this.productId);
      console.log(this.category);

      this.getProductDetails();

      this.productsVisited = this.productVisitedService.getProductVisited();
      console.log(this.productsVisited);

    }


  openclosePanel() {
      this.panelOpenState = !this.panelOpenState;
  }



  getRouteName(): void {
    console.log("Looking for route name");
    this.currentUrl = this.route.snapshot.url.join('/');
    this.currentUrlArray = this.currentUrl.split('/');

    const foundIndex = this.currentUrlArray.findIndex(x => x === 'search');
    if (foundIndex > -1) {
      this.currentUrlArray[foundIndex] = this.product.family;
    }

    console.log(this.currentUrlArray);
  }


  removeProduct() {
    this.quantity--;
  }


  addProduct() {
    this.quantity++
  }


  showSuccess() {
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
    this.visible = !this.visible;
  }


  navigateTo(path:any): void {

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


  getProductDetails() {

    this.loading = true;

    this.productService.getProductById(this.category, this.productId).then(data => {
       this.product = data;
       this.loading = false;
      console.log(this.product);

    this.images = this.product?.prod_images?.product_images_file_path;

    if(this.product?.prod_images.drawings_file_path) {
      this.drawings = this.product?.prod_images?.drawings_file_path;
      for (let drawing of this.drawings) {
        this.images.push(drawing);
      }
    }

    this.productImages = [];
    for (let image of this.images) {
      console.log(image);
      this.productImages.push(new Product_Images(image, image, image, image));
    }


      if(this.product?.prod_images.product_icons_file_path  && this.product?.prod_images.product_icons_file_path[0].length > 0) {
        this.prodApplicationMaterial = this.product?.prod_images.product_icons_file_path;
        console.log(this.prodApplicationMaterial);
      }


      if(this.product?.prod_materials.application_material_name && this.product?.prod_materials.application_material_name[0].length > 0 ) {
        this.prodMaterialNames = this.product?.prod_materials.application_material_name;
        console.log(this.prodMaterialNames);
        console.log(this.category);

        if(this.category.toLowerCase() == "Taps".toLowerCase() || this.product.family.toLowerCase() == "Taps".toLowerCase()) {
          for (let materialName of this.prodMaterialNames) {
            this.cuttingSpeeds.push(this.product?.cutting_speeds["vc_" + materialName]);
          }
        }

        console.log(this.cuttingSpeeds);
      }



      if(this.product?.prod_materials.application_material_path && this.product?.prod_materials.application_material_path[0].length > 0 ) {

        this.prodMaterial = [];
        let index: any = 0;
        for(let material of this.product?.prod_materials.application_material_path) {
          this.prodMaterial.push(new Material(material, this.cuttingSpeeds[index]));
          index++;
        }

        console.log(this.prodMaterial);
      }

      if(this.product?.prod_documents.dxf_path) {
         this.sourceDXF = new ProductFiles("dxf", this.product?.prod_documents.dxf_file, this.product?.prod_documents.dxf_path);
      }

      if(this.product?.prod_documents.stp_path) {
        this.sourceSTP = new ProductFiles("stp", this.product?.prod_documents.stp_file, this.product?.prod_documents.stp_path);
      }

      if(this.product?.prod_documents.cutting_conditions_path) {
        this.sourcePDF = new ProductFiles("pdf", this.product?.prod_documents.cutting_conditions, this.product?.prod_documents.cutting_conditions_path);
      }

      console.log(this.sourceDXF);
      console.log(this.sourceSTP);
      console.log(this.sourcePDF);

      if(this.product?.features?.length > 0) {
        this.features = this.product.features;
      }

    this.product.internal_coolant_ic === "0" ? this.product.internal_coolant_ic = "Non" : this.product.internal_coolant_ic = "Yes";
    this.product.a_brand === "0" ? this.product.a_brand = "Non" : this.product.a_brand = "Yes";

    console.log(this.product);

      if(this.category ==  "search" ) {
        this.category = this.product.family;
      }

      this.getRouteName();

      this.getSpecsDetails();

    if(this.product?.suggestions?.length > 0) {
      this.getSuggestions();
    }


    })
    .catch(error => {
      console.error('Error:', error);
       }
    );
  }


  getProductBySku(sku: any) {

    this.productService.getProductBySearchSku(this.productId).subscribe(data => {
       this.product = data;

       console.log(this.product);
    });
  }


  getSpecsDetails() {

     this.categoryService.getSpecsByCategory(this.product.family).subscribe(data => {
        this.specifications = data;

        console.log(this.category);
      this.specsService.setSpecsByCateg(this.product, this.specifications, this.category);

      console.log(this.specifications);
     })
  }



  getSuggestions() {

    this.suggestions = new Suggestion(this.category, this.product.suggestions);
    console.log(this.suggestions);

    this.productService.getSuggestions(this.suggestions).subscribe(data => {
          this.tableSuggestions = data;

          console.log(this.tableSuggestions);
    });
  }



  productDetails(product: any) {

    this.router.navigate(['product', this.category, product.sku]).then(() => {
      window.location.reload();
    });
  }


  viewFile(fileInfo: any) {


    let filePath = "assets/" + fileInfo.path;
    this.sourceFile = new ProductFiles(fileInfo.type, fileInfo.name, filePath);

    this.showing = true;
  }


  downloadFile(fileInfo: any) {

    console.log(fileInfo);
    this.dataServices.downloadFile(fileInfo).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = fileInfo.name + "." + fileInfo.type;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }


  showCompareProducts() {

      this.productsToSelectForCompare = [];

      for(let prod of this.productsVisited) {

        this.productsToSelectForCompare.push(prod);
      }

      this.ref = this.dialogService.open(PickListComponent, {
        data: this.productsToSelectForCompare,
        header: 'Product List',
        modal: true,
        width: '70vw',
        height: '80vh',
        closable: true,
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        templates: {
          footer: Footer
        }
      });

    this.ref.onClose.subscribe((products: any) => {

      console.log(products);

      if (products) {

        let listSku: any[] = [];

        for(let prod of products) {
           listSku.push(prod.sku);
        }

        this.messageService.add({ severity: 'info', summary: 'Product Selected' });

        console.log(this.productsCompare);
        console.log(this.category);
        this.productService.getProductByCompare(listSku, this.category).subscribe(data => {

             this.productsCompare = data;
             console.log(this.productsCompare);

             this.compareService.setCriteriasToCompare(this.productsCompare, this.category);
             this.productsToCompare = this.compareService.getListProducts();
             this.criteriasToCompare = this.compareService.getCriterias(this.category);

             console.log(this.productsToCompare);
             console.log(this.criteriasToCompare);

          }
        )
      }
    });

      this.ref.onMaximize.subscribe((value) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Maximized',
          detail: `maximized: ${value.maximized}`
        });
      });

  }


  checkProductVisited(sku: any) {


    console.log("Visited product again");
     this.router.navigate(['product', this.category, sku]).then(() => {
       this.ngOnInit();
     });
  }


  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {

    if(this.pdfViewer && !this.pdfViewer.nativeElement.contains(event.target)) {
      this.showing = false;
    }
  }


  protected readonly isNaN = isNaN;
}
