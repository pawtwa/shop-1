import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-cart-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input()
  public product: any;

  private destroyed$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.unsubscribe()
  }
}
