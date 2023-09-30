import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { BehaviorSubject } from 'rxjs';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private cartService: CartsService
  ) {}
  noLogged$: BehaviorSubject<boolean> = this.cartService.noLogged$;
  ngOnInit() {}

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
}
