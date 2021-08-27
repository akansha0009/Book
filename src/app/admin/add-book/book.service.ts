import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class BookService{
    bookForm: any;
    constructor(private http: HttpClient){}

    addBook(
        name: string,
        author: string,
        price: string,
        category: string,
        description: string,
        image: File
    ){
        // console.log(data);
        // return this.http.post('http://localhost:3000/add-book', data);
        // console.log(bookData);
        const bookData = new FormData();
        bookData.append('name', name);
        bookData.append('author', author);
        bookData.append('price', price);
        bookData.append('category', category);
        bookData.append('description', description);
        bookData.append('image', image, name);
        const promise = new Promise((resolve, reject) => {
            this.http.post('http://localhost:3000/add-book',bookData).subscribe(res => {
                console.log(res);
                resolve(res);
            })
        });
        return promise;
    }
}