import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';

@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent],
  selector: 'app-contact',
  styleUrl: './app.component.contact.css',
  templateUrl: './app.component.contact.html'
})
export class ContactComponent implements OnInit  {



  constructor() {
  }

  ngOnInit(): void {

  }





}
