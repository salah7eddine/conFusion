import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'dishDetail/:id', component: DishDetailComponent },
  { path: 'contact', component: ContactComponent },
];
