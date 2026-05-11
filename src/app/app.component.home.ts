import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';

import { MatSelectModule} from '@angular/material/select';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule} from 'primeng/menu';
import {CommonModule} from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button';

import {AnimationBuilder} from '@angular/animations';
import {Router, RouterLink} from '@angular/router';
import {HeaderComponent} from './Pages/app.component.header';
import {FooterComponent} from './Pages/app.component.footer';
import {Category} from './Class/Category';
import {CategoryService} from './Services/CategoryService';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgxLiteYoutubeModule} from 'ngx-lite-video';
import {DataService} from './Services/DataService';



@Component({
  imports: [MatSelectModule, MatMenuModule, MenubarModule, MenuModule, CommonModule, CarouselModule, HeaderComponent, MatButtonModule, FooterComponent, RouterLink, NgxLiteYoutubeModule],
  selector: 'app-home',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.home.html'
})
export class HomeComponent implements OnInit {

  visible: boolean = false;
  responsiveOptions: any[] | undefined;
  selectedLanguage: any;
  consentCookies: boolean = false;
  categories: Category[] = [];


  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild('cookiesDisclaimer') cookiesDisclaimer!: ElementRef;
  @ViewChild('homePage') homePage!: ElementRef;
  @ViewChild("menuDown") menuDown!: ElementRef;


  products: Array<object> = [{
    image: 'A-POT-6GX.jpg',
    title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
    description: 'EDP: 8304732'
  },
    {
      image: 'A-POT-6GX.jpg',
      title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
      description: 'EDP: 8304732'
    },
    {
      image: 'A-POT-6GX.jpg',
      title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
      description: 'EDP: 8304732'
    },
    {
      image: 'A-POT-6GX.jpg',
      title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
      description: 'EDP: 8304732'
    },
    {
      image: 'A-POT-6GX.jpg',
      title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
      description: 'EDP: 8304732'
    },
    {
      image: 'A-POT-6GX.jpg',
      title: 'OSG P1,25x9,5x26,3-INT WXO-ST-PNC',
      description: 'EDP: 8304732'
    }
  ];


  youtubeVideos: any[] = [];
  mainVideo: any;


  constructor(private el: ElementRef , private builder : AnimationBuilder, private router: Router, private dataService:  DataService, private categoryService: CategoryService, private _sanitizer: DomSanitizer) {

  }

  ngOnDestroy(): void {
    // this.localStorage.clear();
  }

  ngOnInit(): void {
    // this.consentCookies = JSON.parse(<string>this.localStorage.getItem('consent'));
    // console.log(this.consentCookies);

    this.responsiveOptions = [
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

    this.getAllCategories();

    this.getDataYoutube();

    this.youtubeVideos = [];
  };


  acceptCookies() {
    this.consentCookies = true;
    this.homePage.nativeElement.style.opacity = 1;
    // this.localStorage.setItem('consent', this.consentCookies.toString());
  }

  // showDialogSearch(event: boolean) {
  //    console.log(event)
  //    this.homePage.nativeElement.style.opacity = 0.8;
  //    this.visible = event;
  // }
  //
  // closeDialog() {
  //   this.homePage.nativeElement.style.opacity = 1;
  //   this.visible = false;
  // }

  getDataYoutube() {

      this.dataService.getLastVideos().subscribe(data => {
          this.youtubeVideos = data;
          this.mainVideo = this.youtubeVideos[0];
          console.log(this.youtubeVideos);
      });
  }



  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    })
  }


  @HostListener('document:scroll', ['$event'])
  pageScroll(e: any) {
    if (window.scrollY > 500) {
      this.menuDown.nativeElement.style.display = 'block';
    } if (window.scrollY < 500) {
      this.menuDown.nativeElement.style.display = 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}


