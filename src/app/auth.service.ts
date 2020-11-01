import { Injectable } from '@angular/core';
import {GetApiService} from './get-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  NombreElements;
  constructor(private api: GetApiService) { }

  setLoggedIn(Username: string, Email: string): void{
    this.loggedInStatus = true;
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('Username', Username);
    localStorage.setItem('Email', Email);
    this.api.GET_USERS().subscribe((data) => {
      this.NombreElements = data['hydra:totalItems'] - 1;
      for (let i = 0; i <= this.NombreElements; i++) {
        if ((data['hydra:member'][i].email) === Email) {
          localStorage.setItem('UserID', data['hydra:member'][i].id);
        }
      }
      window.location.reload();
    });
  }

  setDisconnected(): void{
    this.loggedInStatus = false;
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('Username', '');
    localStorage.setItem('Email', '');
    window.location.reload();
  }

  isLoggedIn(): boolean{
    return this.loggedInStatus;
  }
}
