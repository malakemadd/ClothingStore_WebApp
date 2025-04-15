import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AboutComponent } from './Components/about/about.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';

export const routes: Routes = [
  { path: 'register',component:RegisterComponent},
  { path: 'login',component:LoginComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'orders',component:OrdersComponent},
  {path: 'CheckOut/:id', component: CheckOutComponent},
  { path: 'success', component: PaymentSuccessComponent },
  { path : "ProductDetails/:id", component: ProductDetailsComponent },
  {path:"home",component:HomeComponent,title:"Home"},
  { path:"",redirectTo:"home",pathMatch:"full"},
  {path:"products", component:ProductsComponent},
  {path:"wishlist", component:WishlistComponent},
  {path:"about", component:AboutComponent},
  {path:"admin", component:DashBoardComponent},

];
