import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'category', component: CategoryDetailComponent },
      { path: 'detail', component: DetailProductComponent }
    ]
  }
];

export const ProductRoutes = RouterModule.forChild(routes);
