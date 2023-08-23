import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../address.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  address: any = {};
  isLoading: boolean = false;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  update(address: any): void {
    if (this.id) {
      this.isLoading = true;
      this.addressService.editAddress(this.id, address).subscribe({
        next: (response) => {
          this.router.navigate(['/list']);
          console.log('Edited successfully', this.address);
        },
        error: (error) => {
          console.error(error);
        },
      });
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.id) {
      this.addressService.getAddress(this.id).subscribe((data) => {
        this.address = data;
        this.isLoading = false;
      });
    } else {
      console.error('No ID provided in the URL.');
      this.isLoading = false;
    }
  }
}
