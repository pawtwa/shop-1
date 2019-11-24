import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {ProductComponent} from "./components/cart/product/product.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
        outlet: 'home'
      },
      {
        path: ':id',
        component: ProductComponent,
        outlet: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
