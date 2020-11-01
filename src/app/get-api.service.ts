import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  data;
  urlBlock = 'http://localhost:8000/api/blocks';
  urlUser = 'http://localhost:8000/api/users';
  constructor(private http: HttpClient) {

  }

  GET_API_BLOCK(): Observable<object> {
    return this.http.get('http://localhost:8000/api/blocks');
  }

  GET_USERS_BLOCK(): Observable<object>{
    return this.http.get('http://localhost:8000/block/user/' + localStorage.getItem('UserID'));
  }

  GET_USERS(): Observable<object> {
    return this.http.get('http://localhost:8000/api/users');
  }

  POST_API_BLOCK(Content: string, Status: string, Position: number): void {
    this.http.post(this.urlBlock, {
        content: Content,
        status: Status,
        position: Position,
        userId: localStorage.getItem('UserID'),
      }
    ).subscribe((data: any) => {
    });
  }

  POST_LOGIN(Password: string, Email: string): any{
    return this.http.post('http://localhost:8000/loginTest/login', {
        password: Password,
        email: Email,
      }
    );
  }

  DELETE_API_BLOCK(id: number): void{
    const endPoints: string = id.toString();
    this.http.delete(this.urlBlock + '/' + endPoints).subscribe(data => {
    });
  }

  PUT_API_BLOCK(id: number, Status: string): void {
    const endPoints: string = id.toString();
    this.http.put(this.urlBlock + '/' + endPoints, {
      status: Status
    }).subscribe((data: any) => {
    });
  }

  POST_API_USER(Email: string, FirstName: string, LastName: string, Password: string): void {
    this.http.post(this.urlUser, {
        email: Email,
        firstName: FirstName,
        lastName: LastName,
        password: Password,
      }
    ).toPromise().then((data: any) => {
    });
  }

}
