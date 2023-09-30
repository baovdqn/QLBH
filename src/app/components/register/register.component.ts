import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  onSubmit() {
    // Here, you can add your login logic.
    // For example, you can send a request to a server to validate the user's credentials.
    // For demonstration purposes, we'll just log the form data to the console.
    console.log('Form Data:', this.formData);
  }
}
