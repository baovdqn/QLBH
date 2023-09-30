import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.component';
import { dataFake } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  listProduct: Product[] = dataFake;
  ngOnInit() {}
}
