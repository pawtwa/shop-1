import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent implements OnInit {
    @Input()
    public product: any;

    constructor() {}

    ngOnInit() {}
}
