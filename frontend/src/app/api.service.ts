import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Client } from './shared/models/client';
import { Product } from './shared/models/product';
import { environment } from './environments/environment';
import { SharedService } from './shared/shared.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private sharedService: SharedService,) {}

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(
      environment.backendLoginClient,
      data,
      httpOptions
    ).pipe(
        tap((response: Client) => {
          console.log('Login response:', response);
        })
      );
      
  }

  public getCatalogue(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendProduct);
    
  }

  public createAccount(userData: any): Observable<any> {
    const endpoint = environment.backendCreateUser;
    return this.http.post(endpoint, userData).pipe(
      catchError((error) => {
        console.error('Error creating account:', error);
        throw error;
      })
    );
  }

  public getUserInfo(): Observable<any> {
    const token = this.sharedService.getAccessToken();
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    return this.http.get<any>(environment.backendgetUserinfo, { headers });
  }
}
