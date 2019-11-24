import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';
import {timer} from 'rxjs';

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent implements OnInit {
    @Input()
    public product: any;

    @HostBinding('class.filled') filled = false;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {}

    public imageLoad() {
        timer(0).subscribe(() => {
            this.markFilled(!!this.product, true);
        });
    }

    private markFilled(filled: boolean, markForCheck = false) {
        this.filled = filled;
        if (markForCheck) {
            this.changeDetectorRef.markForCheck();
        }
    }
}
