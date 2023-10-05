import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [{ path: '', component: CartComponent }];

export const CartRoutes = RouterModule.forChild(routes);
