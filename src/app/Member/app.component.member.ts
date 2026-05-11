
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';


@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, Menu],
  selector: 'app-domain',
  styleUrl: './app.component.member.css',
  templateUrl: './app.component.member.html'
})
export class MemberComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Nexam',
        routerLink: './industry'
      },
      {
        label: 'WEXO',
        routerLink: './product',
      },
      {
        label: 'OSG Ex-Cell-O',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'Visher & Boli AG',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'SOMTA',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'Brunswick Tooling',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'FIUDI',
        command: () => {
          this.router.navigate(['/installation']);
        }
      }
    ]
  }

}
