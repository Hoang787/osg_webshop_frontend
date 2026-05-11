import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Panel} from 'primeng/panel';
import {HttpClient} from '@angular/common/http';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {DataService} from '../Services/DataService';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {Badge} from 'primeng/badge';
import {Router} from '@angular/router';
import {ScrollTop} from 'primeng/scrolltop';
import {PanelMenu} from 'primeng/panelmenu';


@Component({
  imports: [CommonModule, Panel, PaginatorModule, HeaderComponent, FooterComponent, NgxDocViewerModule, Menu, ScrollTop, PanelMenu],
  selector: 'app-catalogue',
  standalone: true,
  styleUrl: './app.component.catalog.css',
  templateUrl: './app.component.catalog.html'
})
export class CatalogComponent implements OnInit {

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  @ViewChild('panelVideo') videoViewer!: ElementRef;
  items: MenuItem[] | undefined;

  catalogs: any[] = [
    {
      title: "Forets - mars 12, 2020 HY-PRO Carbide Drilling Series VOL.V",
      imgsrc: "catalog1.jpg",
      description: "XPF & S-XPF series represents a new evolution in forming tap technology. These forming taps generate up to 50% less torque versus other forming taps making it feasible to tap materials up to 40 HRC and sizes up to M45",
      pdfsrc: "DentalSolutions.pdf",
      videosrc: "IDS-Messevideo-NEU.mp4"
    },
    {
      title: "Forets - mars 12, 2020 HY-PRO Carbide Drilling Series VOL.V",
      imgsrc: "catalog1.jpg",
      description: "XPF & S-XPF series represents a new evolution in forming tap technology. These forming taps generate up to 50% less torque versus other forming taps making it feasible to tap materials up to 40 HRC and sizes up to M45",
      pdfsrc: "DentalSolutions.pdf",
      videosrc: "IDS-Messevideo-NEU.mp4"
    },
    {
      title: "Forets - mars 12, 2020 HY-PRO Carbide Drilling Series VOL.V",
      imgsrc: "catalog1.jpg",
      description: "XPF & S-XPF series represents a new evolution in forming tap technology. These forming taps generate up to 50% less torque versus other forming taps making it feasible to tap materials up to 40 HRC and sizes up to M45",
      pdfsrc: "DentalSolutions.pdf",
      videosrc: "IDS-Messevideo-NEU.mp4"
    },
    {
      title: "Forets - mars 12, 2020 HY-PRO Carbide Drilling Series VOL.V",
      imgsrc: "catalog1.jpg",
      description: "XPF & S-XPF series represents a new evolution in forming tap technology. These forming taps generate up to 50% less torque versus other forming taps making it feasible to tap materials up to 40 HRC and sizes up to M45",
      pdfsrc: "DentalSolutions.pdf",
      videosrc: "IDS-Messevideo-NEU.mp4"
    },
  ]

  currentPage: number = 0;
  rows: number = 2;
  tableDisplay: any[] = [];
  totalRecords: number = 4;

  sourcePDF: string = '../assets/files/DentalSolutions.pdf';
  datafile!: Uint8Array;
  blobfile!: Blob;
  showing: boolean = false;
  showVideo: boolean = false;


  menuMobile = [
    {
      label: 'Catalogs',
      icon: 'pi pi-book',
      items: [
        {
          label: 'Documents',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Invoices',
              icon: 'pi pi-file-pdf',
              items: [
                {
                  label: 'Pending',
                  icon: 'pi pi-stop'
                },
                {
                  label: 'Paid',
                  icon: 'pi pi-check-circle'
                }
              ]
            },
            {
              label: 'Clients',
              icon: 'pi pi-users'
            }
          ]
        },
        {
          label: 'Images',
          icon: 'pi pi-image',
          items: [
            {
              label: 'Logos',
              icon: 'pi pi-image'
            }
          ]
        }
      ]
    }
    ]

  constructor(private httpClient: HttpClient, private dataServices: DataService, private elementRef: ElementRef, private router: Router) {
  }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Main Catalog',
        routerLink: './industry'
      },
      {
        label: 'Brochures',
        routerLink: './product',
        items: [
          {
            label: 'Taps',
            routerLink: './industry'
          },
          {
            label: 'Mills',
            routerLink: './product'
          },
          {
            label: 'End Mills',
            routerLink: ''
          },
          {
            label: 'Drills',
            routerLink: ''
          },
          {
            label: 'Threads',
            routerLink: ''
          },
          {
            label: 'Indexables',
            routerLink: ''
          },
          {
            label: 'Reamers',
            routerLink: ''
          },
          {
            label: 'Gauges',
            routerLink: ''
          }
        ]
      },
      {
        label: 'Somta',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'Wexo',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'Industrial Solutions',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'Videos',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'OSG SHAPE IT',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        separator: true
      },
      {
        label: 'Certificates',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'NC Code Generator Software',
        command: () => {
          this.router.navigate(['/installation']);
        }
      }
    ]
  }

  toggleMenuItem(item: any) {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }


  async getPDFBlob(): Promise<File> {
    const pdfFile = await fetch(this.sourcePDF);
    const buffer = await pdfFile.arrayBuffer();
    return new File([buffer],  "DentalSolutions"  , { type: pdfFile.type });
  }


  async viewPdf(event: any) {

      console.log(event);
    const file =  this.getPDFBlob();

    // const files: File = event.target.files[0];
    console.log(file);

    if(file) {
      (await file).arrayBuffer().then(buff => {
        this.datafile = new Uint8Array(buff);
      });
    }
    this.showing = true;
  }

  closePDF() {
      this.showing = false;
  }

  openVideo(event: any) {
    console.log(event);
      this.showVideo = true;
  }

  closeVideo() {
      this.showVideo = false;
  }

  downloadPdf(event: any) {

      console.log(event);
      this.dataServices.downloadFile(event).subscribe((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = event.name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }

  onPageChange(event: PaginatorState) {
    console.log(event.page);
    this.currentPage = event.page ?? 0;
    this.rows = event.rows ?? 2;
    this.getData(this.currentPage, this.rows);
  }

  getData(currentPage: number, pageSize: number) {
    this.tableDisplay = this.catalogs.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
     if(this.videoViewer && !this.videoViewer.nativeElement.contains(event.target)) {
        this.showVideo = false;
     }
     if(this.pdfViewer && !this.pdfViewer.nativeElement.contains(event.target)) {
        this.showing = false;
     }
  }

}
