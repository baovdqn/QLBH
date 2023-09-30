import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/features/products/product/product.component';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  cart: Product[] = [];
  constructor(private readonly cartsService: CartsService) {}

  ngOnInit() {
    this.cartsService.carts$.subscribe((cart) => {
      this.cart = cart;
    });
  }
}
