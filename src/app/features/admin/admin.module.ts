import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import {
  NgbPaginationModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgbTypeaheadModule,
    NgbPaginationModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzPopconfirmModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
