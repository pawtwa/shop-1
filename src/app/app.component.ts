import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {LoaderService} from "./services/loader/loader.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop-one-angular';

  public showLoader = false;

  private destroyed$ = new Subject<void>();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.get().pipe(takeUntil(this.destroyed$)).subscribe((show) => this.showLoader = show);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
