import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { Product } from 'src/app/features/products/product/product.component';
import { CartsService } from 'src/app/services/carts.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  cart: Product[] = [];
  constructor(
    private readonly cartsService: CartsService,
    private route: ActivatedRoute,
    private treeService: TreeService
  ) {}
  list: any[] = ['Trang chủ'];

  ngOnInit() {
    this.cartsService.carts$.subscribe((cart) => {
      this.cart = cart;
    });
    // this.route.queryParams.subscribe((params) => {
    //   console.log('exits params: ', params);
    // });
    this.route.queryParams
      .pipe(
        switchMap((query: any) => {
          const queryParams = query;
          const hasCategory = queryParams.hasOwnProperty('c');
          const hasProduct = queryParams.hasOwnProperty('p');
          if (hasCategory) {
            this.treeService
              .detailCategory(queryParams.c)
              .subscribe((res: any) => {
                const name = res.name;
                const breadcrumbs = this.resetList();
                breadcrumbs.push(name);
                this.list = breadcrumbs;
                console.log(this.list);
                return of(this.list);
              });
          } else if (hasProduct) {
            this.treeService.detailTree(queryParams.p).subscribe((res: any) => {
              const resTree = res;
              const breadcrumbs = this.resetList();
              breadcrumbs.push(resTree.categories[0].name);
              breadcrumbs.push(resTree.name);
              this.list = breadcrumbs;
              console.log(this.list);
              return of(this.list);
            });
          } else {
            this.list = this.resetList();
            console.log(this.list);
            return of(this.list);
          }
          return of([]);
        })
      )
      .subscribe((res: any) => {
        console.log('bread', res);
      });
  }
  resetList(): string[] {
    return (this.list = ['Trang chủ']);
  }
}
