
import {Component, OnInit} from '@angular/core';
import {CommonModule, ViewportScroller} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {ScrollTop} from 'primeng/scrolltop';
import {FactoriesService} from '../Services/FactoriesService';
import {ActivatedRoute} from '@angular/router';



@Component({
  imports: [HeaderComponent, FooterComponent, CommonModule, ScrollTop],
  selector: 'app-factory',
  styleUrl: './app.component.factory.css',
  templateUrl: './app.component.factory.html'
})
export class FactoryComponent implements OnInit {

  menuItems: any[] = [
    {
      icon: 'fas fa-home',
      label: 'Company Outline',
      link: 'history',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Vision' },
        { icon: 'fas fa-tasks', label: 'Philosophy' },
        { icon: 'fas fa-chart-pie', label: 'Profile' },
        { icon: 'fas fa-tasks', label: 'Leadership' },
        { icon: 'fas fa-chart-pie', label: 'History' },
        { icon: 'fas fa-tasks', label: 'Business' },
        { icon: 'fas fa-chart-pie', label: 'OSG Brand' }
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
        { icon: 'fas fa-user', label: 'Germany' },
        { icon: 'fas fa-lock', label: 'Italy' },
        { icon: 'fas fa-user', label: 'Austria' },
        { icon: 'fas fa-lock', label: 'Denmark' },
        { icon: 'fas fa-user', label: 'Irland' },
        { icon: 'fas fa-lock', label: 'Netherlands' },
        { icon: 'fas fa-user', label: 'Poland' },
        { icon: 'fas fa-lock', label: 'Portugal' },
        { icon: 'fas fa-user', label: 'Romania' },
        { icon: 'fas fa-lock', label: 'Slovakia' },
        { icon: 'fas fa-user', label: 'South-Africa' },
        { icon: 'fas fa-lock', label: 'Spain' },
        { icon: 'fas fa-user', label: 'Sweden' },
        { icon: 'fas fa-lock', label: 'Switzerland' },
        { icon: 'fas fa-user', label: 'Turkey' },
        { icon: 'fas fa-lock', label: 'U.K' },
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
  countryOpen: string = '';
  countries: any[] = []
  factories: any[] = [];
  country: any;

  constructor(private scroller: ViewportScroller, private factoriesService: FactoriesService, private route: ActivatedRoute) {

  }


  ngOnInit(): void {

    let country = this.route.snapshot.paramMap.get('country')!;

    this.getAllFactories();

  }

  toggleMenuItem(item: any) {

    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }


  scrollToSection(section:  any) {
     window.location.hash = '';
     console.log(section);
     window.location.hash = '#' + section;
  }

  openCompanyMenu() {
    this.companyMenu = !this.companyMenu;
  }

  openFactoryMenu() {
    this.factoryMenu = !this.factoryMenu;
  }

  scrollToView(elem: any) {
    this.scroller.scrollToAnchor(elem);
  }

  getAllFactories() {

    this.factoriesService.getAllCountries().subscribe(data => {
        this.factories = data;

        console.log(this.factories);

    });
  }

}
