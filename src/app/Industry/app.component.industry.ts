import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollTopModule} from 'primeng/scrolltop';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';

@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, ScrollTopModule],
  selector: 'app-industry',
  standalone:  true,
  styleUrl: './app.component.industry.css',
  templateUrl: './app.component.industry.html',

})
export class IndustryComponent implements OnInit {

  @ViewChild('feature') feature! : ElementRef;
  @ViewChild('fieldItem') fieldItems! : ElementRef;

  images: any[] = [
    {
       name: "automotive",
       type: ".jpg"
    },
    {
      name: "cylinder_head",
      type: ".jpg"
    },
    {
      name: "cast_iron",
      type: ".png"
    },
    {
      name: "alloy_steel",
      type: ".png"
    },
    {
      name: "crankshaft",
      type: ".jpg"
    },
    {
      name: "aluminum",
      type: ".png"
    },
  ]

  imgSelectTive: any = "/assets/img/auto_" + this.images[0].name + this.images[0].type;
  stateChange: number = 0;

  constructor() {

    }


    ngOnInit(): void {

    }


  productsEngine(event: any) {
     console.log(event.target.innerText.toLowerCase().split(' ').join("_"));

     this.stateChange = 1;
     console.log(this.stateChange);
     for(let img of this.images) {
       if(img.name == event.target.innerText.toLowerCase().split(' ').join("_")) {
         this.imgSelectTive = "/assets/img/auto_" + img.name + img.type;
       }
     }

  }

  // @HostListener('document:scroll', ['$event'])
  // pageScroll(e: any) {
  //   if (window.scrollY > 700) {
  //     this.feature.nativeElement.style.display = 'block';
  //     this.fieldItems.nativeElement.style.display = 'block';
  //   } if (window.scrollY < 700) {
  //     this.feature.nativeElement.style.display = 'none';
  //     this.fieldItems.nativeElement.style.display = 'none';
  //   }
  //   if (window.scrollY > 1100) {
  //     this.fieldItems.nativeElement.style.display = 'block';
  //   } if (window.scrollY < 1100) {
  //     this.fieldItems.nativeElement.style.display = 'none';
  //   }
  // }



}
