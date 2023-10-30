import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData = {
    fullName: '',
    email: '',
    password: '',
    repassword: '',
    phoneNumber: '',
    role: 'customer'
  };

  showAlert: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  onSubmit() {
    // Here, you can add your login logic.
    // For example, you can send a request to a server to validate the user's credentials.
    // For demonstration purposes, we'll just log the form data to the console.
    this.accountService.registerAccountCustomer(this.formData).subscribe(
      (res) => {
        this.activeModal.close();
        alert('Đăng kí thành công');
      },
      (err) => {
        (this.showAlert = true), catchError(err);
      }
    );
  }
}
