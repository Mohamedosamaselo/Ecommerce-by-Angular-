import { DetailsComponent } from './components/details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [authGuard], loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then((m) => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent), title: 'Home' },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then((m) => m.BrandsComponent), title: 'Brands' },

      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then((m) => m.AllordersComponent), title: 'allorders' },

      { path: 'forgetpassword', loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent), title: 'forgetpassword' },

      { path: 'payment/:id', loadComponent: () => import('./components/payment/payment.component').then((m) => m.PaymentComponent), title: 'payment' },


      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then((m) => m.CategoriesComponent), title: 'Categories' },
      { path: 'categorydetails/:id', loadComponent: () => import('./components/categorydetails/categorydetails.component').then((m) => m.CategorydetailsComponent), title: 'Categorydetails' },


      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent), title: 'Cart' },
      { path: 'products', loadComponent: () => import('./components/products/products.component').then((m) => m.ProductsComponent), title: 'Products' },
      { path: 'wishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then((m) => m.WishlistComponent), title: 'wishlist' },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then((m) => m.DetailsComponent), title: 'details' }
    ]
  },



  {
    path: '', loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent), title: 'Auth', children: [
      { path: 'login', loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent), title: 'Register' },
      { path: 'forget', loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent), title: 'forgetpassword' }
    ]
  },

  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent), title: 'Not Found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
