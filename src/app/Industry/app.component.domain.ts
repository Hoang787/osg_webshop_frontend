import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {ScrollTop} from 'primeng/scrolltop';



@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, ScrollTop],
  selector: 'app-domain',
  styleUrl: './app.component.domain.css',
  templateUrl: './app.component.domain.html'
})
export class DomainComponent implements OnInit {


     constructor() {

     }


    ngOnInit(): void {

    }

}
