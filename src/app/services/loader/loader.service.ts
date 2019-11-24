import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoader = new BehaviorSubject<boolean>(false);

  constructor() { }

  public show(): void {
    this.showLoader.next(true);
  }

  public hide(): void {
    this.showLoader.next(false);
  }

  public get(): Observable<boolean> {
    return this.showLoader.asObservable();
  }
}
