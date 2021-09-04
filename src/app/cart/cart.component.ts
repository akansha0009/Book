import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = []

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.getUserId();
    this.cartService.getBookToCart().then((res:any) => {
      console.log(res);
      this.cart = res.data;
    })
  }

  onDelete(bookId: string){
    this.cartService.deleteCart(bookId);
  }



}
