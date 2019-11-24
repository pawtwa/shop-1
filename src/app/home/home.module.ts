import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent as ProductCartComponent } from './components/cart/product/product.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListItemComponent } from './components/products-list/product-list-item/product-list-item.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsListComponent,
    CartComponent,
    ProductCartComponent,
    ProductComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  entryComponents: []
})
export class HomeModule { }
