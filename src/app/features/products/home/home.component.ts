import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { Product } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private treeService: TreeService,
    private route: ActivatedRoute
  ) {}

  listProduct: Product[] = [];
  ngOnInit() {
    this.getAllTree();
    this.route.queryParams.subscribe((params: any) => {
      if (params?.search) {
        const keySearch = params.search;
        this.treeService
          .getTreeWithFilter(keySearch)
          .subscribe((data: any) => (this.listProduct = data.rows));
      } else {
        this.getAllTree();
      }
    });
  }
  getAllTree() {
    this.treeService
      .getAllTree()
      .subscribe((data) => (this.listProduct = data.rows));
  }
}
