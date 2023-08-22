import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAddresses(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/dev/addresses');
  }
  addAddress(address: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/dev/addresses', address);
  }
  deleteAddress(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/dev/addresses/${id}`);
  }
}
