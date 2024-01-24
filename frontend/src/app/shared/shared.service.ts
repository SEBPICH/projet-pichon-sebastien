// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private goToInscriptionSubject = new BehaviorSubject<boolean>(false);
  public _accessToken!: string;
  goToInscription$: Observable<boolean> = this.goToInscriptionSubject.asObservable();

  setGoToInscription(value: boolean): void {
    this.goToInscriptionSubject.next(value);
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  getAccessToken(): string {
    return this._accessToken;
  }

  setAccessToken(token: string): void {
    this._accessToken = token;
    localStorage.setItem('accessToken', this._accessToken);
  }

  clearAccessToken(): void {
    this._accessToken = '';
    localStorage.removeItem('accessToken');
  }
}
