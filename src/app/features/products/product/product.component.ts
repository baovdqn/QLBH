import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: any;
  constructor(private cartsService: CartsService, private router: Router) {}

  ngOnInit() {}

  addToCart(product: any) {
    let cart = this.cartsService.carts$.value;
    if (cart.length == 0) {
      product.quantity = 1;
      cart.push(product);
    } else {
      const indexTreeExit = cart.findIndex((i) => i.id == product.id);
      if (indexTreeExit !== -1) {
        cart[indexTreeExit].quantity = cart[indexTreeExit].quantity + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
    }
    this.cartsService.carts$.next(cart);
    console.log(this.cartsService.carts$.value);
  }

  goToDetail(product: any) {
    this.router.navigateByUrl('/products/detail?p=' + product.id);
  }
}

export interface Product {
  id: string;
  nameProduct: string;
  priceProduct: string | number;
  salePriceProduct: string | number | undefined;
  imageProduct: string;
  quantity: number;
}
