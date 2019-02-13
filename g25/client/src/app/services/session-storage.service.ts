import {Injectable} from '@angular/core';

@Injectable()
export class SessionStorageService {
  private _loggedIn: boolean;

  constructor() {
    const token = localStorage.getItem('loggedIn');
    this._loggedIn = (token && this.isTokenValid(token));
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  setLoggedIn(loggedIn: boolean, token?: string): void {
    this._loggedIn = loggedIn;
    if (loggedIn) {
      localStorage.setItem('loggedIn', token);
    } else {
      localStorage.removeItem('loggedIn');
    }
  }

  getToken(): string {
    return localStorage.getItem('loggedIn');
  }

  private isTokenValid(token: string): boolean {
    const splittedToken = token.split('.');
    if (splittedToken.length === 3) {
      const expirationTime = JSON.parse(atob(splittedToken[1]))['exp'];
      if (Math.floor(Date.now() / 1000) <= expirationTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
