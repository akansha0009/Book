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
  price;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.getUserId();
    this.cartService.getBookToCart().then((res:any) => {
      console.log("res",res);
      this.cart = res.data;
      this.price = res.data[0].price;
      console.log("price", this.price)
      this.totalPrice();
    })

    
  }

  onDelete(id: string){
    this.cartService.deleteCart(id);
  }

  totalPrice(){
    let total = 0;
    for(let i=0; i<this.cart.length; i++){
      total += this.price;
    }
    return total;
  }
  

  onConfirmOrder(cart){
    console.log(cart);
    this.cartService.order(cart);
    }
  

}
