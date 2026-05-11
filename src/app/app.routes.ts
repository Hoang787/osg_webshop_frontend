import { Routes } from '@angular/router';
import {HomeComponent} from './app.component.home';
import {ProductComponent} from './ProductByCategory/app.component.products';
import {ProductDetailsComponent} from './ProductDetails/app.component.productDetails';
import {ProductGeneralComponent} from './ProductsGeneral/app.component.productGeneral';
import {DomainComponent} from './Industry/app.component.domain';
import {IndustryComponent} from './Industry/app.component.industry';
import {CatalogComponent} from './Catalogs/app.component.catalog';
import {MapSiteComponent} from './OSGMapSite/app.component.mapsite';
import {FactoryComponent} from './OSGFactory/app.component.factory';
import {CompanyComponent} from './OSGCompany/app.component.company';
import {NewsComponent} from './News/app.component.news';
import {EventDetailsComponent} from './Events/app.component.eventdetails';
import {PrivacyComponent} from './Privacy/app.component.privacy';
import {AboutOSGComponent} from './AboutOSG/app.component.aboutOSG';
import {ContactComponent} from './Customer_Services/app.component.contact';
import {GroupMembersComponent} from './Group_Members/app.component.groupmembers';
import {MemberComponent} from './Member/app.component.member';
import {NewProductComponent} from './News/app.component.newproduct';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'product/:categ', component: ProductComponent },
  { path: 'product/:categ/:id', component: ProductDetailsComponent },
  { path: 'product', component: ProductGeneralComponent },
  { path: 'industry', component: DomainComponent },
  { path: 'automotive', component: IndustryComponent },
  { path: 'map', component: MapSiteComponent },
  { path: 'factory', component: FactoryComponent },
  { path: 'factory/:country', component: FactoryComponent },
  { path: 'history', component: CompanyComponent },
  { path: 'newproduct', component: NewProductComponent},
  { path: 'news', component: NewsComponent },
  { path: 'eventdetails', component: EventDetailsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'aboutOSG', component: AboutOSGComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'groupmembers', component: GroupMembersComponent },
  { path: 'members', component: MemberComponent },
  { path: 'catalogs', component: CatalogComponent }
];
