import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAddresses(): Observable<any> {
    return this.http.get<any>('https://47hpo17an4.execute-api.eu-north-1.amazonaws.com/default/GetAddresses');
  }
}
