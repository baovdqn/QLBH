import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  ngOnInit() {}

  page = 1;
  pageSize = 6;

  carts: any = [];
  sumPrice: any = 0;
  constructor(private cartService: CartsService) {
    this.carts = this.cartService.carts$.value;
    if (this.carts.length > 0) {
      this.sumPrice = this.carts.reduce((a: any, b: any) => {
        return a + b.price;
      }, 0);
    }
  }
}
