import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HomeComponent } from './home/home.component';
import { ProductRoutes } from './product.routing';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
  imports: [CommonModule, RouterModule, ProductRoutes],
  declarations: [
    ProductsComponent,
    HomeComponent,
    BreadcrumbsComponent,
    ProductComponent,
    DetailProductComponent,
    CategoryDetailComponent
  ]
})
export class ProductsModule {}
