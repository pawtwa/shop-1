import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ProductsService} from "../../../services/products/products.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  public products: any[];

  private destroyed$ = new Subject<void>();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((products: any[]) => this.products = products);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

}
