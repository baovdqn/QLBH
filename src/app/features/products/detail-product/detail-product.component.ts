import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
    private treeService: TreeService
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
}
