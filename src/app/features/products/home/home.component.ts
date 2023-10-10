import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private treeService: TreeService) {}

  listProduct: Product[] = [];
  ngOnInit() {
    this.treeService
      .getAllTree()
      .subscribe((data) => (this.listProduct = data.rows));
  }
}
