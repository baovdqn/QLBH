import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  listCategory: any[] = [];
  listCategoryAdmin = [
    { name: 'Quản lý danh mục nhóm loại cây', link: 'category' },
    { name: 'Quản lý danh mục cây cảnh', link: 'tree' },
    { name: 'Quản lý danh mục khách hàng', link: 'client' },
    { name: 'Quản lý danh mục hoá đơn', link: 'invoice' },
    { name: 'Quản lý danh mục nhân viên', link: 'staff' }
  ];
  noLogged$ = this.coreService.noLogged$;
  isRouteAdmin$ = this.coreService.activeAdmin$;

  constructor(
    private coreService: CoreService,
    private router: Router,
    private treeService: TreeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      const end = event instanceof NavigationEnd;
      const regex = /^\/admin.*/g;
      if (end) {
        if (regex.test(event.url)) {
          this.coreService.activeAdmin$.next(true);
        } else {
          this.coreService.activeAdmin$.next(false);
        }
        this.getCategories();
      }
    });
  }

  getCategories() {
    this.treeService.getCategories().subscribe((res: any) => {
      this.listCategory = res.rows;
    });
  }

  navigateTo(link: string) {
    const url = `/admin?manage=${link}`;
    this.router.navigateByUrl(url);
  }

  goToCategory(category: any) {
    this.router.navigateByUrl('/products/category?c=' + category.id);
  }
}
