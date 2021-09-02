import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { RecentBooksComponent } from './recent-books/recent-books.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'recent-books', component: RecentBooksComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
