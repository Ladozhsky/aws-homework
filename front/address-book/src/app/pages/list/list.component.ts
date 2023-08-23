import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../address.service';
import { Address } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  addresses: Address[] = [];
  isLoading: boolean = false;
  constructor(private addressService: AddressService, private router: Router) {}

  delete(id: string): void {
    this.addressService.deleteAddress(id).subscribe({
      next: (response) => {
        this.ngOnInit();
        console.log('Deleted successfully', response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  edit(id: string): void {
    this.router.navigate([`/edit/${id}`]);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
      this.isLoading = false;
    });
  }
}
