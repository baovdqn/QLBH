import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  listProduct: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private treeService: TreeService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((res: any) => {
          const categoryId = res?.c;
          return this.treeService.getTreeByCategory(categoryId);
        })
      )
      .subscribe((res) => {
        this.listProduct = res.rows;
      });
  }
}
