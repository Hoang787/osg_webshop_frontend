import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';


@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent],
  selector: 'app-aboutOSG',
  styleUrl: './app.component.aboutOSG.css',
  templateUrl: './app.component.aboutOSG.html'
})
export class AboutOSGComponent implements OnInit {

  @ViewChild("menuDown") menuDown!: ElementRef;

  constructor() {

  }


   ngOnInit(): void {

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
