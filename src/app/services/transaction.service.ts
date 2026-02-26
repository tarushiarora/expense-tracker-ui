import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // using a header to send Jwt token
  // so that my spboot backend knows who's asking for their data

  private apiUrl = '/api/transactions';

  constructor(private http: HttpClient) {}

  // to get token from browser's memory
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  saveTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.apiUrl, transactionData, {
      headers: this.getHeaders(),
    });
  }
}
