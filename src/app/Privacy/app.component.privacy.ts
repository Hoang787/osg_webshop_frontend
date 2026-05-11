
import {Component, OnInit} from '@angular/core';
import {CommonModule, ViewportScroller} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {PanelMenu} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {ScrollTop} from 'primeng/scrolltop';



@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, PanelMenu, Ripple, ScrollTop],
  selector: 'app-privacy',
  styleUrl: './app.component.privacy.css',
  templateUrl: './app.component.privacy.html',
})
export class PrivacyComponent implements OnInit {

    items: MenuItem[] | undefined;

    constructor(private scroller: ViewportScroller) {
    }

    ngOnInit(): void {
      this.items = [
        {
          label: 'Contents',
          icon: 'pi pi-align-justify',
          items: [
            {
              label: 'Overview',
              command: () => {
                this.scrollToView('overview');
              }
            },
            {
              label: 'Processing',
              command: () => {
                this.scrollToView('processing');
              }
            },
            {
              label: 'Collecting',
              command: () => {
                this.scrollToView('collecting');
              }
            },
            {
              label: 'Data',
              command: () => {
                this.scrollToView('data');
              }
            },
            {
              label: 'Purposes',
              command: () => {
                this.scrollToView('purposes');
              }
            },
            {
              label: 'Sharing',
              command: () => {
                this.scrollToView('sharing');
              }
            },
            {
              label: 'Security',
              command: () => {
                this.scrollToView('security');
              }
            },
            {
              label: 'Cookies',
              command: () => {
                this.scrollToView('cookies');
              }
            },
            {
              label: 'Right',
              command: () => {
                this.scrollToView('right');
              }
            }
            ]
          }
        ]
    }

    scrollToView(elem: any) {
      this.scroller.scrollToAnchor(elem);
    }
}
