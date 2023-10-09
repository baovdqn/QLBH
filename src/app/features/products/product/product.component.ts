import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: any;
  constructor(private cartsService: CartsService) {}

  ngOnInit() {}

  addToCart(product: any) {
    let cart = this.cartsService.carts$.value;
    cart.push(product);
    this.cartsService.carts$.next(cart);
  }
}

export interface Product {
  id: string;
  nameProduct: string;
  priceProduct: string | number;
  salePriceProduct: string | number | undefined;
  imageProduct: string;
}
