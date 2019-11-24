import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

import {ProductsService} from "../../../services/products/products.service";
import {takeUntil} from "rxjs/operators";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public product: any;

  private destroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        this.productsService.getProduct(+params.id).subscribe((product: any) => {
          this.product = product;
        })
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.unsubscribe();
  }

  public addToCart(event: MouseEvent) {
    event.preventDefault();
    this.cartService.add({...this.product});
  }
}
