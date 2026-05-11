
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {NgIf} from '@angular/common';


@Component({
  imports: [HeaderComponent, FooterComponent, NgIf],
  selector: 'app-history',
  styleUrl: './app.component.company.css',
  templateUrl: './app.component.company.html'
})
export class CompanyComponent implements OnInit {

  menuItems: any[] = [
    {
      icon: 'fas fa-home',
      label: 'Company Outline',
      link: 'history',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Vision' },
        { icon: 'fas fa-tasks', label: 'Philosophy' },
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'OSG Europe',
      link: 'offices',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Belgium' },
        { icon: 'fas fa-lock', label: 'French' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Investor'
    },
    {
      icon: 'fas fa-envelope',
      label: 'Careers'
    }
  ];

  companyMenu: boolean = false;
  factoryMenu: boolean = false;


  ngOnInit(): void {

    }

  toggleMenuItem(item: any) {

    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  openCompanyMenu() {
    this.companyMenu = !this.companyMenu;
  }

  openFactoryMenu() {
    this.factoryMenu = !this.factoryMenu;
  }

}
