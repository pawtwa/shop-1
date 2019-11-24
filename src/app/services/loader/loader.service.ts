import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, timer} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    counter = 0;

    private showLoader = new BehaviorSubject<boolean>(false);

    constructor() {}

    public show(): void {
        if (this.counter < 1) {
            this.showLoader.next(true);
        }
        this.counter++;
    }

    public hide(): void {
        this.counter--;
        if (this.counter < 1) {
            this.showLoader.next(false);
        }
    }

    public get(): Observable<boolean> {
        return this.showLoader.asObservable();
    }
}
