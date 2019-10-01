import { Injectable } from '@angular/core';
import {UserAuth} from '../model/user-auth';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  clear() {
    this.clearStorage();
    window.sessionStorage.clear();
  }

  public saveToken(auth: UserAuth) {
    this.clearStorage();
    this.setStorage(auth);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setStorage(auth: UserAuth): void {
    window.sessionStorage.setItem(TOKEN_KEY, auth.token);
    window.sessionStorage.setItem(USERNAME_KEY, auth.username);
  }

  public clearStorage() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
  }

  public getUserAuth(): UserAuth {

    return {
      'token': window.sessionStorage.getItem(TOKEN_KEY),
      'username': window.sessionStorage.getItem(USERNAME_KEY)
    };
  }}
