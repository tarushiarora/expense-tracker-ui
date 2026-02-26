import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/transaction.model';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl = '/api/categories';

  constructor(private http: HttpClient) { }
  
  // to attach JWT token for security
  private getHeaders(){
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, {headers: this.getHeaders()});
  }
}
