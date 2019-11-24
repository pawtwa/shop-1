import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  private cart$ = new BehaviorSubject<any[]>(this.cart);

  constructor() {
  }

  public add(item: any) {
    console.log(this.cart, item);
    let cartItemIndex = this.cart.findIndex((cartItem: any): boolean => cartItem.productId === item.id);
    let cartItem = cartItemIndex >= 0
      ? {...this.cart[cartItemIndex]}
      : {productId: item.id, title: item.title, amount: 0};
    ++cartItem.amount;
    this.cart = [...this.cart];
    if (cartItemIndex >= 0) {
      this.cart[cartItemIndex] = cartItem;
    } else {
      this.cart.push(cartItem);
    }
    this.cart$.next(this.cart);
  }

  public get(): Observable<any[]> {
    return this.cart$.asObservable();
  }
}
