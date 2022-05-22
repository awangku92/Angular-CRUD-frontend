import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  endpoint: string = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // Get all user
  Test() {
    let API_URL = `${this.endpoint}/`;
    return this.http.get(API_URL);
  }

  // Add user
  AddUser(data : User): Observable<any> {
    let API_URL = `${this.endpoint}/add`;
    return this.http
      .post(API_URL, data )
      .pipe(catchError(this.errorMgmt));
  }

  // Get all user
  GetAllUser() {
    let API_URL = `${this.endpoint}/viewall`;
    return this.http.get(API_URL);
  }

  // Get user
  GetUser(id): Observable<any> {
    let API_URL = `${this.endpoint}/view/${id}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update user
  UpdateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/edit/${id}`;
    return this.http
      .put(API_URL, data, { params: { name: data.name, phoneno : data.phoneno }, headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete user
  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/${id}`;
    console.log(API_URL);
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse, res) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
