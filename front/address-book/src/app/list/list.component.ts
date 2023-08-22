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

  delete(id: string): void {
    this.addressService.deleteAddress(id).subscribe({
      next: (response) => {
        this.ngOnInit()
        console.log('Deleted successfully', response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
    });
  }
}
