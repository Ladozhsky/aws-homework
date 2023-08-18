import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service'; // Путь к сервису

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  addresses: any[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
    });
  }
}
