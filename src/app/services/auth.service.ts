import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // login url of spboot backend
  private apiUrl1 = '/api/auth/login';

  // register url
  private apiUrl2 = '/api/auth/register';

  // to call api, to send post request
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any>{
    return this.http.post<any>(this.apiUrl2, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, credentials);
  }
}

// observable: like a stream of data that will arrive eventually
