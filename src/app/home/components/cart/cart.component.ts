import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {CartService} from '../../../services/cart/cart.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    public products: any[];

    private destroyed$ = new Subject<void>();

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.cartService
            .get()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((products: any[]) => (this.products = products));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
