import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  ngOnInit() {}
  carts: any = [];
  sumPrice: any = 0;
  isVisibleModal: boolean = false;
  formConfirmTransaction = {
    address: ''
  };
  isOkLoading: boolean = false;
  @ViewChild('formTransition', { static: false }) formTransition!: NgForm;

  constructor(
    private cartService: CartsService,
    private modalService: NzModalService
  ) {
    this.carts = this.cartService.carts$.value;
    this.updatePrice();
  }

  updatePrice(): void {
    if (this.carts.length > 0) {
      this.sumPrice = this.carts.reduce((a: any, b: any) => {
        return a + b.price * b.quantity;
      }, 0);
    }
  }

  checkout() {
    this.isVisibleModal = true;
  }

  clear(index: number, carts: any[]) {
    this.carts.splice(index, 1);
    this.carts = JSON.parse(JSON.stringify(this.carts));
    this.updatePrice();
  }

  handleConfirm(form?: any) {
    this.isOkLoading = true;
    if (this.formTransition.invalid) {
      for (let i in this.formTransition.controls) {
        if (this.formTransition.controls[i].invalid) {
          this.formTransition.controls[i].markAsDirty();
          this.formTransition.controls[i].updateValueAndValidity({
            onlySelf: true
          });
        }
      }
      return;
    }

    let transaction = {
      address: this.formTransition.value.address,
      price: this.sumPrice,
      listItem: this.carts
    };
    // console.log(transaction);
    this.cartService.createTransaction(transaction).subscribe(
      (res) => {
        this.isOkLoading = false;
        this.isVisibleModal = false;
        alert('Mua hàng thành công');
        this.cartService.carts$.next([]);
        this.carts = [];
      },
      (err) => {
        this.isOkLoading = false;
        alert('Mua hàng thất bại');
      }
    );
  }

  increment(data: any) {
    const findTree = this.carts.findIndex((i: any) => i.id === data.id);
    if (findTree !== -1) {
      if (this.carts[findTree].quantity === 1) {
        return;
      }
      this.carts[findTree].quantity = this.carts[findTree].quantity - 1;
    }
    this.updatePrice();
  }

  decrement(data: any) {
    const findTree = this.carts.findIndex((i: any) => i.id === data.id);
    if (findTree !== -1) {
      this.carts[findTree].quantity = this.carts[findTree].quantity + 1;
    }
    this.updatePrice();
  }
}
