import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    public getProducts(): Observable<any[]> {
        return this.http.get<any[]>('/assets/stubs/products.json');
    }

    public getProduct(productId: number): Observable<any> {
        return this.getProducts().pipe(
            map((products: any[]): any => {
                return products && products.length
                    ? products.find(item => item.id === productId)
                    : null;
            }),
        );
    }
}
