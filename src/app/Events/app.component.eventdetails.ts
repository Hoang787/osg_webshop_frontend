
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';



@Component({
  imports: [HeaderComponent, FooterComponent, CommonModule],
  selector: 'app-event',
  styleUrl: './app.component.eventdetails.css',
  templateUrl: './app.component.eventdetails.html'
})
export class EventDetailsComponent implements OnInit {


    ngOnInit(): void {

    };

}
