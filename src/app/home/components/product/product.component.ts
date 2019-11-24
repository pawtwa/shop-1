import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

import {ProductsService} from '../../../services/products/products.service';
import {CartService} from '../../../services/cart/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
    public product: any;

    @HostBinding('class.filled') filled = false;

    private destroyed$ = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private productsService: ProductsService,
        private cartService: CartService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe((params: Params) => {
            this.productsService.getProduct(+params.id).subscribe((product: any) => {
                this.product = product;
                if (!this.product) {
                    this.router.navigate(['not-found']).then();
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }

    public addToCart(event: MouseEvent) {
        event.preventDefault();
        this.cartService.add({...this.product});
    }

    imageLoad() {
        this.markFilled(!!this.product);
    }

    private markFilled(filled: boolean) {
        this.filled = filled;
    }
}
