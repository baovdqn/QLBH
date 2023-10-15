import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { CoreService } from 'src/app/services/core.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private coreService: CoreService,
    private router: Router,
    private accountService: AccountService
  ) {}
  noLogged$: BehaviorSubject<boolean> = this.coreService.noLogged$;
  ngOnInit() {
    this.accountService.currentUser.subscribe((user) => {
      if (user?.id) {
        this.coreService.noLogged$.next(false);
      } else {
        this.coreService.noLogged$.next(true);
      }
    });
  }

  openFormLogin() {
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true
    });
  }

  openFormRegister() {
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true
    });
  }

  logout() {
    this.coreService.noLogged$.next(true);
    this.accountService.logout();
  }

  manager() {
    this.router.navigate(['admin']);
  }
}
