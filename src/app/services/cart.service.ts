import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root',
})

export class CartService{
    constructor(private http: HttpClient, private authService: AuthService){}

    addToCart(book){
         const userId =this.authService.getUserId();

        this.http.post('http://localhost:3000/cart',{ data:book,userId:userId}).subscribe(res => {
            console.log(res)
        })
    }

    getBookToCart(){
        this.http.get('http://localhost:3000/cart').subscribe(res => {
            console.log(res);
        })
    }
}