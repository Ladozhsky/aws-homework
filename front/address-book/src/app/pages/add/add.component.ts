import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  newAddress = {
    name: '',
    city: '',
    street: '',
    house: '',
  };

  isLoading: boolean = false;

  constructor(private addressService: AddressService, private router: Router) {}

  create(): void {
    this.isLoading = true;
    this.addressService.addAddress(this.newAddress).subscribe({
      next: (response) => {
        this.router.navigate(['/list']);
        console.log('Added successfully', this.newAddress);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.isLoading = false;
  }

  ngOnInit(): void {}
  //   this.addressService.addAddress(this.newAddress).subscribe(
  //     response => {
  //         console.log('Added successfully', response)
  //     },
  //     error => {
  //         console.error(error)
  //     }
  //   )
  // }
}
