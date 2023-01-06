import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShellComponent } from './components/shell/shell.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', component: ShellComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductFormComponent
      }
      ,
      {
        path: 'products/form/:id',
        component: ProductFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UserFormComponent
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, onSameUrlNavigation: 'reload'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
