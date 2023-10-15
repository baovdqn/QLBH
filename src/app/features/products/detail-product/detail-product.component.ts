import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CartsService } from 'src/app/services/carts.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private treeService: TreeService,
    private cartService: CartsService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((res: any) => {
          return this.treeService.detailTree(res.p);
        })
      )
      .subscribe((res) => {
        this.product = res;
      });
  }
  addToCart(product: any) {
    let cart = this.cartService.carts$.value;
    cart.push(product);
    this.cartService.carts$.next(cart);
  }
}
