import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Calendar} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {Paginator, PaginatorState} from 'primeng/paginator';



@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, Calendar, Paginator],
  selector: 'app-news',
  standalone: true,
  styleUrl: './app.component.news.css',
  templateUrl: './app.component.news.html',
})
export class NewsComponent implements OnInit {


  currentPage: number = 0;
  rows: number = 10;
  totalRecords: number = 15;

  date1: Date = new Date("2025-07-27T03:24:00");
  date2: Date = new Date("2025-07-28T03:24:00");
  date3: Date = new Date("2025-08-05T03:24:00");
  date4: Date = new Date("2025-08-08T03:24:00");
  dates?: Date[] = [];


    ngOnInit(): void {
      this.dates?.push(this.date1);
      this.dates?.push(this.date2);
      this.dates?.push(this.date3);
      this.dates?.push(this.date4);
    }

  onPageChange(event: PaginatorState) {
    console.log(event.page);
    this.currentPage = event.page ?? 0;
    this.rows = event.rows ?? 2;

  }


}
