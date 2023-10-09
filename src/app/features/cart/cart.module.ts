import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutes } from './cart.routing';
import {
  NgbTypeaheadModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro/ng-zorro.module';

@NgModule({
  imports: [CommonModule, CartRoutes, FormsModule, DemoNgZorroAntdModule],
  declarations: [CartComponent]
})
export class CartModule {}
