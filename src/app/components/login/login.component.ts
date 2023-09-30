import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { admin } from 'src/app/features/admin/account';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData = {
    username: '',
    password: ''
  };
  account = admin;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartsService
  ) {}

  ngOnInit() {}

  onSubmit() {
    // Here, you can add your login logic.
    // For example, you can send a request to a server to validate the user's credentials.
    // For demonstration purposes, we'll just log the form data to the console.
    console.log('Form Data:', this.formData);
    if (
      this.formData.username === admin.username &&
      this.formData.password === admin.password
    ) {
      this.cartService.noLogged$.next(false);
    } else {
    }
  }
}
