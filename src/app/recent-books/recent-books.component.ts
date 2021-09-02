import { Component, OnInit } from '@angular/core';
import { BookService } from '../admin/add-book/book.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-recent-books',
  templateUrl: './recent-books.component.html',
  styleUrls: ['./recent-books.component.css']
})
export class RecentBooksComponent implements OnInit {
  bookData = [];


  constructor(private bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.bookService.getBook().then((res: any) => {
      console.log(res);
      this.bookData= res.message;
    });
  }

  addCart(book){
    this.cartService.addToCart(book);
  }

}
