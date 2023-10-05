import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COUNTRIES, Country } from '../cart/cart.component';
import { TreeService } from 'src/app/services/tree.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  listCategoryAdmin = [
    { name: 'Quản lý danh mục nhóm loại cây', link: 'category' },
    { name: 'Quản lý danh mục cây cảnh', link: 'tree' },
    { name: 'Quản lý danh mục khách hàng', link: 'client' },
    { name: 'Quản lý danh mục hoá đơn', link: 'invoice' },
    { name: 'Quản lý danh mục nhân viên', link: 'staff' }
  ];
  activeCategory: any;
  page = 1;
  pageSize = 6;
  collectionSize = COUNTRIES.length;
  countries!: Country[];
  listCategories: any[] = [];

  //tree
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  listTree: any[] = [];

  //client
  listClient: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treeService: TreeService,
    private accountService: AccountService
  ) {
    const currentUser = JSON.parse(
      window.localStorage.getItem('currentUser') || '{}'
    );
    const role = currentUser?.role;
    if (!role || role !== 'admin') {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      const query = queryParams?.manage;
      if (!query) {
        this.activeCategory = this.listCategoryAdmin[0];
      } else {
        this.activeCategory = this.listCategoryAdmin.filter(
          (c: any) => c.link === query
        )[0];
      }
      if (this.activeCategory.link === 'category') {
        this.treeService.getCategories().subscribe((res: any) => {
          this.listCategories = res?.rows;
        });
      }
      if (this.activeCategory.link === 'tree') {
        this.getListTree();
      }
      if (this.activeCategory.link === 'client') {
        this.getAllClient();
      }
    });
    //tree
    this.addRow();
  }

  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({
      id: i + 1,
      ...country
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  /* tree */
  getListTree() {
    this.treeService
      .getAllTree()
      .subscribe((tree) => (this.listTree = tree.rows));
  }
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    // this.listOfData = [
    //   ...this.listOfData,
    //   {
    //     id: `${this.i}`,
    //     name: `Edward King ${this.i}`,
    //     age: '32',
    //     address: `London, Park Lane no. ${this.i}`
    //   }
    // ];
    // this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d) => d.id !== id);
  }
  /* end tree*/

  //client
  getAllClient() {
    this.accountService
      .getAllCustomer()
      .subscribe((client) => (this.listClient = client.rows));
  }
}

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
