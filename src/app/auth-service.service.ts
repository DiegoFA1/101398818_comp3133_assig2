import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  authStatus = this.loggedIn.asObservable();

  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem('isUserLoggedIn') === 'true';
  }

  login() {
    localStorage.setItem('isUserLoggedIn', 'true');
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.setItem('isUserLoggedIn', 'false');
    this.loggedIn.next(false);
  }
}