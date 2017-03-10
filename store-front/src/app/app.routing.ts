/**
 * Created by z00382545 on 1/16/17.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {OrderComponent} from './components/order/order.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
  	path: 'myAccount',
  	component: MyAccountComponent
  },
  {
    path: 'myProfile',
    component: MyProfileComponent
  },
  {
    path: 'bookList',
    component: BookListComponent
  },
  {
    path: 'bookDetail/:id',
    component: BookDetailComponent
  },
  {
    path: 'shoppingCart',
    component: ShoppingCartComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
