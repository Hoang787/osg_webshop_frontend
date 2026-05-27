import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import maplibregl, { Map, NavigationControl, Marker, LngLat } from 'maplibre-gl';

import {NominatimResponse} from '../Class/NominatimResponse';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';
import {NominatimService} from '../Services/NominatingService';
import {FactoriesService} from '../Services/FactoriesService';
import {Router} from '@angular/router';
import {Popover} from 'primeng/popover';
import {MenuItem} from 'primeng/api';
import {Tooltip, TooltipModule} from 'primeng/tooltip';



@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent, TooltipModule],
  selector: 'app-map',
  styleUrl: './app.component.mapsite.css',
  templateUrl: './app.component.mapsite.html'
})
export class MapSiteComponent implements OnInit {

  @ViewChild("factoryDetails") factoryDetails!: Popover;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  map: Map | undefined;
  OSGAddress: string = "Avenue Lavoisier 1, 1300 Wavre-Nord, Belgium";
  zoom = 2.5;
  searchResults: any[] = [];
  markersOSG: any[] = [
    { longitude: 4.597779, latitude: 50.735802, name: "OSG Europe Logistics S.A."},
    { longitude: 4.597779, latitude: 50.735802, name: "OSG Belux s.a.n.v."},
    { longitude: 3.261720, latitude: 50.851521, name: "OSG David Grinding Services"},
    { longitude: 2.544803, latitude: 49.008953, name: "OSG France S.A.S"},
    { longitude: 4.254213, latitude: 45.518348, name: "NEXAM S.A.S"},
    { longitude: 9.6883299, latitude: 48.7143578, name: "OSG GmbH"},
    { longitude: 8.6162189, latitude: 50.2181582, name: "WEXO GmbH"},
    { longitude: 9.9338036, latitude: 49.4024331, name: "BASS GmbH"},
    { longitude: 9.6883299, latitude: 48.7143578, name: "OSG EX-CELL-O GmbH"},
    { longitude: 7.5556237, latitude: 45.0623179, name: "OSG Italia S.R.L."},
    { longitude: 7.5556300, latitude: 45.0623200, name: "Fiudi S.R.L."},
    { longitude: -6.24889, latitude: 53.33306, name: "Wingilt Limited"},
    { longitude: 4.96111, latitude: 52.09, name: "OSG Nederland B.V."},
    { longitude: 5.45972, latitude: 51.35083, name: "Contour Fine Tooling B.V."},
    { longitude: 21.3520092, latitude: 52.2265127, name: "OSG Poland Sp. z.o.o."},
    { longitude: -8.8235, latitude: 39.832, name: "Alexandre & Maia, Lda."},
    { longitude: 9.742, latitude: 47.4143, name: "OSG GmbH (Austria Branch)"},
    { longitude: -2.7017, latitude: 42.8548, name: "OSG Ibérica Tooling, S.L.U."},
    { longitude: 17.10674, latitude: 48.14816, name: "OSG Europe Logistics SA (Slovakia Branch)"},
    { longitude: 13.0464721, latitude: 55.6003684, name: "OSG Scandinavia A/S (Sweden Branch)"},
    { longitude: 30.2833, latitude: -29.65, name: "Somta Tools (Pty) Ltd."},
    { longitude: 8.6419321, latitude: 47.3938267, name: "Vischer & Bolli AG"},
    { longitude: 28.92305, latitude: 41.05877, name: "OSG Turkey Kesici Takimlar Sanayi ve Ticaret Anonim Sirketi"},
    { longitude: 0.456124, latitude: 51.585209, name: "OSG U.K. Limited"},
    { longitude: -1.58333, latitude: 53.7, name: "Brunswick Tooling Ltd"},
    { longitude: 17.10674, latitude: 48.14816, name: "OSG Europe Logistics SA (Slovakia Branch)"},
    { longitude: 17.10680, latitude: 48.14820, name: "OSG Europe Logistics SA (Slovakia Branch)"},
    { longitude: 26.1009263, latitude: 44.4356445, name: "OSG ROMANIA S.R.L."},
    { longitude: 12.143678, latitude: 55.64738, name: "OSG Scandinavia A/S"},
  ]

  countries: any[] = [];
  factories: any[] = [];
  coordinatesFact: any[] = [];
  companyMenu: boolean = false;
  factoryMenu: boolean = false;
  menuItems: any[] = [];
  currentFeatureCoordinates: any;



   constructor(private nominatimService: NominatimService, private factoriesService: FactoriesService, private router: Router) {

   }

   ngOnInit() {

     this.getAllFactories();
   }

   ngOnDestroy() {
    this.map?.remove();
   }

    private initMap() {

     this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=agr8clM77988fY5MrVnd",
      center: [this.markersOSG[0].longitude, this.markersOSG[0].latitude],
      zoom: this.zoom
    }).addControl(new NavigationControl(), "top-right");

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
      });

    for (let mark of this.markersOSG) {
      new maplibregl.Marker()
        .setLngLat([mark.longitude, mark.latitude])
        .addTo(this.map);
    }



      this.map.on('mouseleave', () => {
        this.currentFeatureCoordinates = undefined;
        popup.remove();
      });
  }


  zoomToPlace(fact: any) {

     console.log(fact);
     let coordinates: any;
     for(let factory of this.markersOSG) {
        if(fact.name == factory.name) {
          coordinates = factory;
        }
     }

     console.log(coordinates);
     this.zoom = 9;
     this.map?.flyTo({
       center: [
         coordinates.longitude,
         coordinates.latitude
       ],
       zoom: this.zoom,
       essential: true
     });
  }


  addressLookup(address: any[]) {

    this.nominatimService.geocodeAddresses(address).then(results => {
      this.searchResults = results;

      console.log(this.searchResults);
    });
  }

  getAllFactories() {

    this.factoriesService.getAllCountries().subscribe(data => {
      this.countries = data;

      console.log(this.countries);

      for(let country of this.countries) {
         for(let fact of country.factories) {
           this.factories.push(fact);
         }
      }

      console.log(this.factories);

      this.initMap();

    });
  }


  openCompanyMenu() {
      this.companyMenu = !this.companyMenu;
  }

  openFactoryMenu() {
     this.factoryMenu = !this.factoryMenu;
  }


}

