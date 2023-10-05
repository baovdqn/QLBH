import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutes } from './cart.routing';
import {
  NgbTypeaheadModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CartRoutes,
    NgbTypeaheadModule,
    NgbPaginationModule,
    FormsModule
  ],
  declarations: [CartComponent]
})
export class CartModule {}
