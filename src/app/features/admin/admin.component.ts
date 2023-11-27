import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AccountService } from 'src/app/services/account.service';
import { CartsService } from 'src/app/services/carts.service';
import { TreeService } from 'src/app/services/tree.service';

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
  listCategories: any[] = [];

  //tree
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  listTree: any[] = [];

  //client
  listClient: any[] = [];
  //staff: nhân viên
  listStaff: any[] = [];
  isVisible: boolean = false;

  //listInvoices: any[] = [];
  listInvoice: any[] = [];
  isVisibleInvoiceDetail: boolean = false;
  dataDetailInvoice: any;
  listColumnInvoice: any[] = [
    {
      name: 'Mã hoá đơn',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null]
    },
    {
      name: 'Email'
    },
    {
      name: 'Tổng tiền',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null]
    },
    {
      name: 'Địa chỉ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.address.localeCompare(b.address),
      sortDirections: null
    },
    {
      name: 'Thao tác'
    }
  ];

  // isVisible = false;
  formCategory = {
    name: '',
    active: true
  };
  idCategory!: any;
  idTree!: any;
  isEditCategory: boolean = false;
  isEditTree: boolean = false;
  openModalAddTree: boolean = false;

  formTree = {
    name: '',
    description: '',
    price: 0,
    inStock: 0,
    image: '',
    categories: [] as any,
    active: true
  };

  formClient = {
    email: '',
    password: '123456',
    fullName: '',
    phoneNumber: '',
    role: 'customer'
  };
  isVisibleClient: boolean = false;
  isEditClient: boolean = false;

  isVisibleStaff = false;
  isEditStaff = false;
  formStaff: any = {
    email: '',
    password: '123456',
    fullName: '',
    phoneNumber: '',
    role: 'admin',
    address: '',
    hsl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treeService: TreeService,
    private accountService: AccountService,
    private modal: NzModalService,
    private cartService: CartsService
  ) {
    const currentUser = JSON.parse(
      window.localStorage.getItem('currentUser') || '{}'
    );
    const role = currentUser?.role;
    // if (!role || role !== 'admin') {
    //   this.router.navigateByUrl('/');
    // }
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
        this.getCategories();
      }
      if (this.activeCategory.link === 'tree') {
        this.getListTree();
        this.getCategories();
      }
      if (this.activeCategory.link === 'client') {
        this.getAllClient();
      }
      if (this.activeCategory.link === 'staff') {
        this.getAllAdmin();
      }
      if (this.activeCategory.link === 'invoice') {
        console.log('Invoice active');
        this.getAllInvoice();
      }
    });
    //tree
  }

  // refreshCountries() {
  //   this.countries = COUNTRIES.map((country, i) => ({
  //     id: i + 1,
  //     ...country
  //   })).slice(
  //     (this.page - 1) * this.pageSize,
  //     (this.page - 1) * this.pageSize + this.pageSize
  //   );
  // }

  //category
  addCategory() {
    this.isVisible = true;
  }

  editCategory(data: any) {
    this.formCategory = {
      name: data.name,
      active: data.active
    };
    this.isEditCategory = true;
    this.idCategory = data.id;
    this.addCategory();
  }

  deleteCategory(id: string) {
    this.treeService.deleteCategory(id).subscribe(
      (res) => {
        this.treeService.getCategories().subscribe((res: any) => {
          this.listCategories = res?.rows;
        });
      },
      (err) => {
        this.treeService.getCategories().subscribe((res: any) => {
          this.listCategories = res?.rows;
        });
      }
    );
  }

  handleAddCategory() {
    if (!this.isValid()) return;
    if (this.isEditCategory) {
      this.treeService
        .editCategories(this.formCategory, this.idCategory)
        .subscribe((res) => {
          this.treeService.getCategories().subscribe((res: any) => {
            this.listCategories = res?.rows;
          });
          this.handleCancel();
        });
    } else {
      this.treeService.createCategories(this.formCategory).subscribe((res) => {
        this.treeService.getCategories().subscribe((res: any) => {
          this.listCategories = res?.rows;
        });
        this.handleCancel();
      });
    }
  }

  categoriesChange(event: any) {
    this.formTree = {
      ...this.formTree,
      categories: [event]
    };
  }

  getCategories(): void {
    this.treeService.getCategories().subscribe((res: any) => {
      this.listCategories = res?.rows;
    });
  }
  //end category

  /* tree */
  getListTree() {
    const query = '?limit=50';
    this.treeService
      .getAllTree(query)
      .subscribe((tree) => (this.listTree = tree.rows.reverse()));
  }
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  deleteTree(id: string): void {
    this.treeService.deleteTree(id).subscribe((res) => {
      this.getListTree();
    });
  }

  openModalTree() {
    this.openModalAddTree = true;
  }

  handleCancelTree() {
    this.openModalAddTree = false;
    this.isEditTree = false;
    this.formTree = {
      name: '',
      description: '',
      price: 0,
      inStock: 0,
      image: '',
      categories: [] as any,
      active: true
    };
  }

  editTree(data: any) {
    this.formTree = {
      name: data.name,
      description: data.description,
      price: data.price,
      inStock: data.inStock,
      image: data.image,
      categories: data.categories,
      active: true
    };
    this.isEditTree = true;
    this.idTree = data.id;
    this.openModalTree();
  }
  /* end tree*/

  //client
  getAllClient() {
    this.accountService
      .getAccountForRole('customer')
      .subscribe((client: any) => (this.listClient = client.rows));
  }
  getAllAdmin() {
    this.accountService
      .getAccountForRole('admin')
      .subscribe((client: any) => (this.listStaff = client.rows));
  }

  addClient(): void {
    this.formClient = {
      email: '',
      password: '123456',
      fullName: '',
      phoneNumber: '',
      role: 'customer'
    };
    this.isVisibleClient = true;
  }
  addStaff(): void {
    this.formStaff = {
      email: '',
      password: '123456',
      fullName: '',
      phoneNumber: '',
      role: 'admin',
      address: ''
    };
    this.isVisibleStaff = true;
  }

  // Mở modal
  showModal(): void {
    this.isVisible = true;
  }

  // Đóng modal và xóa dữ liệu trong form
  handleCancel(): void {
    this.isVisible = false;
    this.isEditCategory = false;
    this.resetForm();
  }

  // Xử lý khi nhấn nút "Lưu"
  handleOk(): void {
    if (this.isValid()) {
      // Thực hiện lưu dữ liệu ở đây (ví dụ: gửi dữ liệu lên server)
      // Sau khi lưu xong, đóng modal và xóa dữ liệu trong form
      this.isVisible = false;
      this.resetForm();
    }
  }

  // Kiểm tra tính hợp lệ của form
  isValid(): boolean {
    return (
      this.formCategory.name.trim() !== '' && this.formCategory.active !== null
    );
  }

  // Xóa dữ liệu trong form
  resetForm(): void {
    this.formCategory = {
      name: '',
      active: true
    };
  }

  handleAddTree() {
    if (this.isEditTree) {
      this.treeService.editTree(this.formTree, this.idTree).subscribe((res) => {
        this.getListTree();
        this.handleCancelTree();
      });
    } else {
      this.treeService.createTree(this.formTree).subscribe((res) => {
        this.getListTree();
        this.handleCancelTree();
      });
    }
  }

  handleCancelClient() {
    this.isEditClient = false;
    this.isVisibleClient = false;
  }

  handleAddClient() {
    if (
      this.formClient.email == '' ||
      this.formClient.fullName == '' ||
      this.formClient.phoneNumber == ''
    ) {
      return alert('Nhập đủ thông tin');
    }
    this.accountService.registerAccountCustomer(this.formClient).subscribe(
      (res) => {
        alert('Thêm thành công khách hàng mới');
        this.handleCancelClient();
      },
      (err) => alert('Có lỗi khi thêm khách hàng mới')
    );
  }

  handleCancelStaff() {
    this.isEditStaff = false;
    this.isVisibleStaff = false;
  }

  handleAddStaff() {
    if (
      this.formStaff.email == '' ||
      this.formStaff.fullName == '' ||
      this.formStaff.phoneNumber == '' ||
      this.formStaff.address == ''
    ) {
      return alert('Nhập đủ thông tin');
    }
    this.formStaff = {
      email: this.formStaff.email,
      fullName: this.formStaff.fullName,
      phoneNumber: this.formStaff.phoneNumber,
      password: '123456',
      role: this.formStaff.role,
      hsl: this.formStaff.hsl,
      address: this.formStaff.address
    };
    this.accountService.registerAccountCustomer(this.formStaff).subscribe(
      (res) => {
        alert('Thêm thành công nhân viên mới');
        this.handleCancelStaff();
        this.getAllAdmin();
      },
      (err) => alert('Có lỗi khi thêm nhân viên mới')
    );
  }

  getAllInvoice() {
    this.cartService
      .listTransaction()
      .subscribe((res) => (this.listInvoice = res.rows));
  }

  viewDetailInvoice(data: any) {
    this.isVisibleInvoiceDetail = true;
    this.dataDetailInvoice = data;
  }
  handleCancelInvoiceDetail() {
    this.isVisibleInvoiceDetail = false;
  }

  handleOklInvoiceDetail() {
    window.print();
  }

  printInvoice(data: any) {
    this.isVisibleInvoiceDetail = true;
    this.dataDetailInvoice = data;
    setTimeout(() => {
      window.print();
    }, 0);
  }

  deleteUser(userId: string) {
    this.accountService.deleteAccount(userId).subscribe(
      (res) => {
        console.log('deleteUser', res);
        alert('Đã xoá tài khoản');
        this.getAllAdmin();
        this.getAllClient();
      },
      (err) => alert('Có lỗi khi xoá tài khoản')
    );
  }
}

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
