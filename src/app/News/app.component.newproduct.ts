import { Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';



@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent],
  selector: 'app-newdetails',
  styleUrl: './app.component.newproduct.css',
  templateUrl: './app.component.newproduct.html'
})
export class NewProductComponent implements OnInit {



    ngOnInit(): void {

    }

}
