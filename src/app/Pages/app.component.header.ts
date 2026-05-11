
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {Dialog} from 'primeng/dialog';
import {TieredMenu, TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {ProductService} from '../Services/ProductService';
import {Filter_Selected_Categ} from '../Class/Filter_Selected_Categ';
import {Filter_Selected} from '../Class/Filter_Selected';
import {ProductVisitedService} from '../Services/ProductVisitedService';
import {Popover} from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { RippleModule } from 'primeng/ripple';
import {Drawer, DrawerModule} from 'primeng/drawer';
import {Divider} from 'primeng/divider';
import {Splitter} from 'primeng/splitter';
import {Menu} from 'primeng/menu';



@Component({
  imports: [CommonModule, RouterLink, ReactiveFormsModule, Select, FormsModule, Dialog, AutoComplete, Popover, AvatarModule, ButtonModule, MegaMenuModule, DrawerModule, RippleModule, Divider, TieredMenuModule, Menu],
  selector: 'app-header',
  standalone: true,
  styleUrl: './app.component.header.css',
  templateUrl: './app.component.header.html'
})
export class HeaderComponent implements OnInit {

  @Output()
  toShowDialog = new EventEmitter<any>();

  @ViewChild('pop') pop!: Popover;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  visibleDialog: boolean = false;
  visible:  boolean = false;
  visibleDrawer: boolean = false;
  selectedProduct: any;
  suggestionsProduct: any[] = [];
  menu: any[] | undefined;
  menuSecond!: any[];

  countries: any[] | undefined;
  selectedCountry: any = {
    name: 'Belgium', code: 'be'
  }

  menuOptionsMobile: MenuItem[] | undefined;
  menuLanguages: MenuItem[] | undefined;

  showDialog() {
    this.visibleDialog = true;
    this.toShowDialog.emit(this.visibleDialog);
  }


  constructor(private translateService: TranslateService, private productServices: ProductService, private router: Router,
              private productVisitedService: ProductVisitedService) {

  }

  ngOnInit(): void {

    this.countries = [
      {name: 'Belgium', code: 'be'},
      {name: 'French', code: 'fr'},
      {name: 'Germany', code: 'de'},
      {name: 'Netherlands', code: 'nl'},
      {name: 'United Kingdom', code: 'gb'},
      {name: 'Italy', code: 'it'},
      {name: 'Portugal', code: 'pt'},
      {name: 'Spain', code: 'es'},
      {name: 'Switzerland', code: 'ch'},
      {name: 'Denmark', code: 'dk'},
      {name: 'Austria', code: 'at'},
      {name: 'Romania', code: 'ro'},
      {name: 'Irland', code: 'ie'},
      {name: 'Sweden', code: 'se'},
      {name: 'Turkey', code: 'tr'},
      {name: 'South Africa', code: 'za'}
    ];

    this.menu = [
      {
        label: 'Products',
        routerLink: '/product',
        items: [
          {
            label: 'Taps',
            routerLink: 'product/taps'
          },
          {
            label: 'Drills',
            routerLink: 'product/drills'
          },
          {
            label: 'EndMills',
            routerLink: 'product/endmills'
          },
          {
            label: 'Reamers',
            routerLink: 'product/reamers'
          },
          {
            label: 'Indexables',
            routerLink: 'product/indexables'
          },
          {
            label: 'Gauges',
            routerLink: 'product/gauges'
          },
          {
            label: 'Dies',
            routerLink: ''
          },
          {
            label: 'News',
            routerLink: '/news'
          }
        ]
      },
      {
        label: 'Industries',
        routerLink: '/industry',
        items: [
          {
            label: 'Automotive',
            routerLink: 'automotive'
          },
          {
            label: 'Die and Mold',
            routerLink: 'dieAndMold'
          },
          {
            label: 'Aerospace',
            routerLink: 'aerospace'
          },
          {
            label: 'Energy',
            routerLink: 'energy'
          },
          {
            label: 'Medical',
            routerLink: 'medical'
          },
          {
            label: 'Heavy Industry',
            routerLink: 'heavyIndustry'
          }
        ]
      },
      {
        label: 'Catalogs',
        routerLink: '/catalogs',
        items: [
          {
            label: 'Taps',
            routerLink: '/taps'
          },
          {
            label: 'Drills',
            routerLink: '/drills'
          },
          {
            label: 'EndMills',
            routerLink: '/mills'
          }
          , {
            label: 'Threads',
            routerLink: '/threads'
          },
          {
            label: 'Indexables',
            routerLink: '/indexables'
          },
          {
            label: 'Reamers',
            routerLink: '/reamers'
          },
          {
            label: 'Gauges',
            routerLink: '/gauges'
          },
          {
            label: 'Rolling dies',
            routerLink: 'dies'
          },
          {
            label: 'Industrial Solutions',
            routerLink: '/industrialSolutions'
          }
        ]
      },
      {
        label: 'About OSG',
        routerLink: '/aboutOSG',
        items: [
          {
            label: 'Company Outline',
            routerLink: '/history'
          },
          {
            label: 'OSG Europe',
            routerLink: '/factory'
          },
          {
            label: 'Investors',
            routerLink: '/investors'
          },
          {
            label: 'Procurement Activities',
            routerLink: '/activities'
          },
          {
            label: 'Careers',
            routerLink: '/careers'
          }
        ]
      },
      {
        label: 'Group Members',
        routerLink: '/members',
        items: [
          {
            label: 'BASS GMBH',
            routerLink: 'bass'
          },
          {
            label: 'BRUNSWICK TOOLING',
            routerLink: '/brunswick'
          },
          {
            label: 'NEXAM Aircraft',
            routerLink: '/nexam'
          },
          {
            label: 'FIUDI',
            routerLink: '/fiudi'
          },
          {
            label: 'OSG EX-CELL-O',
            routerLink: '/excello'
          },
          {
            label: 'Vischer & Bolli AG',
            routerLink: '/vischer'
          },
          {
            label: 'SOMTA Tools',
            routerLink: '/somta'
          },
          {
            label: 'WEXO TOOLS',
            routerLink: '/wexo'
          }
        ]
      }

    ];


      this.menuSecond = [
        {
          label: 'Products',
          routerLink: '/product',
              column1 : [
                {
                  label: 'Taps',
                  routerLink: 'product/taps'
                },
                {
                  label: 'Drills',
                  routerLink: 'product/drills'
                },
                {
                  label: 'EndMills',
                  routerLink: 'product/endmills'
                },
              ],
              column2: [
                {
                  label: 'Reamers',
                  routerLink: 'product/reamers'
                },
                {
                  label: 'Indexables',
                  routerLink: 'product/indexables'
                },
                {
                  label: 'Gauges',
                  routerLink: 'product/gauges'
                },
              ],
              column3: [
                {
                  label: 'Dies',
                  routerLink: ''
                },
                {
                  label: 'News',
                  routerLink: '/news'
                }
              ]
        },
        {
          label: "Catalogs",
          routerLink: '/catalogs',
          column1 : [
            {
              label: 'Taps',
              routerLink: '/taps'
            },
            {
              label: 'Drills',
              routerLink: '/drills'
            },
            {
              label: 'EndMills',
              routerLink: '/mills'
            }
          ],
          column2: [
            {
              label: 'Threads',
              routerLink: '/threads'
            },
            {
              label: 'Indexables',
              routerLink: '/indexables'
            },
            {
              label: 'Reamers',
              routerLink: '/reamers'
            },
          ],
          column3: [
            {
              label: 'Gauges',
              routerLink: '/gauges'
            },
            {
              label: 'Rolling dies',
              routerLink: 'dies'
            },
            {
              label: 'Industrial Solutions',
              routerLink: '/industrialSolutions'
            }
          ]
        },
        {
          label: 'Industries',
          routerLink: '/industry',
        },
        {
          label: 'About OSG',
          routerLink: '/aboutOSG',
        },
        {
          label: 'Group Members',
          routerLink: '/members',
        }

      ];



    this.menuOptionsMobile = [
      {
        label: 'Products',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Products',
            icon: 'pi pi-plus',
            routerLink: '/product'
          },
          {
            label: 'Taps',
            icon: 'pi pi-plus',
            routerLink: '/product/taps'
          },
          {
            label: 'Drills',
            icon: 'pi pi-file',
            routerLink: '/product/drills'
          },
          {
            label: 'EndMills',
            icon: 'pi pi-image',
            routerLink: '/product/endmills',
          },
          {
            label: 'Reamers',
            icon: 'pi pi-video',
            routerLink: '/product/reamers'
          },
          {
            label: 'Indexables',
            icon: 'pi pi-image',
            routerLink: '/product/indexables'
          },
          {
            label: 'Gauges',
            icon: 'pi pi-video',
            routerLink: '/product/gauges'
          }
        ]
      },
      {
        label: 'Catalogs',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Taps',
            icon: 'pi pi-plus',
          },
          {
            label: 'Drills',
            icon: 'pi pi-file'
          },
          {
            label: 'EndMills',
            icon: 'pi pi-image'
          },
          {
            label: 'Reamers',
            icon: 'pi pi-video'
          },
          {
            label: 'Indexables',
            icon: 'pi pi-image'
          },
          {
            label: 'Gauges',
            icon: 'pi pi-video'
          }
        ]
      },
      {
          label: 'Industries',
          icon: 'pi pi-folder-open'
      },
      {
          label: 'About OSG',
          icon: 'pi pi-print'
      },
      {
        label: 'Group Members',
        icon: 'pi pi-file-edit',
        items: [
          {
            label: 'BASS GMBH',
            routerLink: '/members'
          },
          {
            label: 'BRUNSWICK TOOLING',
            routerLink: '/brunswick'
          },
          {
            label: 'NEXAM Aircraft',
            routerLink: '/nexam'
          },
          {
            label: 'FIUDI',
            routerLink: '/fiudi'
          },
          {
            label: 'OSG EX-CELL-O',
            routerLink: '/excello'
          },
          {
            label: 'Vischer & Bolli AG',
            routerLink: '/vischer'
          },
          {
            label: 'SOMTA Tools',
            routerLink: '/somta'
          },
          {
            label: 'WEXO TOOLS',
            routerLink: '/wexo'
          }
        ]
      }
    ];

    this.menuLanguages = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh'
          },
          {
            label: 'Export',
            icon: 'pi pi-upload'
          }
        ]
      }
    ];


  }


  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  onCountrySelected() {
    console.log(this.selectedCountry);
    this.translateService.use(this.selectedCountry.code);

  }

  searchProduct(event: AutoCompleteCompleteEvent) {

     console.log(event);

     event.query = event.query.trim();

     let filtersCateg: Filter_Selected_Categ = new Filter_Selected_Categ("Product", 100, 0);
     let filterSelected: Filter_Selected = new Filter_Selected("sku", [event.query]);
     filtersCateg.filters_Selected.push(filterSelected);

     if(event.query.length >= 4) {
       this.productServices.getProductsBySearch(filtersCateg).subscribe(data => {
         this.suggestionsProduct = data;

         console.log(this.suggestionsProduct);
       })
     } else {
       this.suggestionsProduct = [];
     }


  }

  webshop() {
    this.visible = !this.visible;
  }


  checkProductDetails(product: any) {

    console.log(product);
     if (product) {
       console.log(product.sku);
       this.router.navigate(["product", "search", product.sku]).then(() => {
         window.location.reload();
       });
     }
  }

  displaySearch(event: any) {
    console.log(event);
      this.pop.toggle(event);
  }

  hideSearch() {
    this.pop.hide();
  }

  homePage() {
    this.router.navigate(['/home']);
  }

  protected readonly onfocus = onfocus;
}



