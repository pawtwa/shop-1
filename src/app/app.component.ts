import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
} from '@angular/router';
import {of, Subject, timer} from 'rxjs';
import {delayWhen, filter, takeUntil} from 'rxjs/operators';

import {LoaderService} from './services/loader/loader.service';
import {insideWorkspace} from '@angular/cli/utilities/project';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'shop-one-angular';

    public showLoader = false;

    public hide = false;

    private destroyed$ = new Subject<void>();

    constructor(private loaderService: LoaderService, private router: Router) {}

    ngOnInit(): void {
        this.loaderService
            .get()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(show => (this.showLoader = show));
        this.router.events
            .pipe(
                filter((event: Event) => {
                    return event instanceof NavigationStart || event instanceof NavigationEnd;
                }),
                delayWhen(
                    (
                        event: NavigationStart | NavigationEnd | NavigationCancel | NavigationError,
                    ) => {
                        if (event instanceof NavigationStart) {
                            return of(0);
                        }
                        return timer(150);
                    },
                ),
            )
            .subscribe((event: NavigationStart | NavigationEnd) => {
                if (event instanceof NavigationStart) {
                    this.hide = true;
                } else {
                    this.hide = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
