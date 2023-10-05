import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { admin } from 'src/app/features/admin/account';
import { AccountService } from 'src/app/services/account.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showAlert: boolean = false;
  formData = {
    email: '',
    password: ''
  };
  account = admin;

  constructor(
    public activeModal: NgbActiveModal,
    private coreService: CoreService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.accountService.login(this.formData).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        localStorage.setItem('token', JSON.stringify(res.jwt.accessToken));
        this.coreService.noLogged$.next(false);
        this.activeModal.close();
        this.router.navigate(['/']);
      },
      (err) => {
        this.showAlert = true;
        this.formData.email = '';
        this.formData.password = '';
      }
    );
    // if (
    //   this.formData.username === admin.username &&
    //   this.formData.password === admin.password
    // ) {
    //   this.coreService.noLogged$.next(false);
    //   this.activeModal.close();
    //   this.router.navigate(['/']);
    // } else {
    //   this.showAlert = true;
    //   this.formData.username = '';
    //   this.formData.password = '';
    // }
  }
}
