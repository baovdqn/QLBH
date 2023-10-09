import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro/ng-zorro.module';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgbTypeaheadModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ],
  declarations: [AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
