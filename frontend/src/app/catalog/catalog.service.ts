import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {

  constructor(private http: HttpClient) {}

  getProducts(searchTerm?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<Product[]>(environment.backendProduct, { params });
  }
}
