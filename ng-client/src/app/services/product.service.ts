import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string = 'http://localhost:4000/api/products';

  constructor( private _http: HttpClient ) { }

  getProducts(): Observable<any> {
    return this._http.get(this.url);
  }

  deleteProduct( id: string ): Observable<Product> {
    return this._http.delete<Product>(`${ this.url }/${ id }`);
  }

  saveProduct( product: Product ): Observable<any> {
    return this._http.post( this.url, product )
  }

  obtainProduct( id: string ): Observable<Product> {
    return this._http.get<Product>(`${ this.url }/${ id }`);
  }

  editProduct( id: string, product: Product ): Observable<Product> {
    return this._http.put<Product>(`${ this.url }/${ id }`, product);
  }
}
