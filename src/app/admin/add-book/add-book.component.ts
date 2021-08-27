import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from './book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  imagePreview: any;
  file: File;
  fileName: string;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'author': new FormControl(''),
      'price': new FormControl(''),
      'category': new FormControl(''),
      'description': new FormControl(''),
      'image': new FormControl('')
    })
  }

  onSubmit(){
    console.log(this.bookForm);
    
    // const data = {
    //   name: this.bookForm.value.name,
    //   author: this.bookForm.value.author,
    //   price: this.bookForm.value.price,
    //   category: this.bookForm.value.category,
    //   description: this.bookForm.value.description,
    // }
    // const bookData = new FormData();
    //     bookData.append('name', this.bookForm.value.name);
    //     bookData.append('author', this.bookForm.value.author);
    //     bookData.append('price', this.bookForm.value.price)
    //     bookData.append('category', this.bookForm.value.category);
    //     bookData.append('description', this.bookForm.value.description);
    //     bookData.append('image', this.bookForm.value.image);
    this.bookService.addBook(
        this.bookForm.value.name,
        this.bookForm.value.author,
        this.bookForm.value.price,
        this.bookForm.value.category,
        this.bookForm.value.description,
        this.bookForm.value.image
    ).then(
      res => {
        console.log(res);
      }
    );
  }

  onSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.bookForm.patchValue({image: file});
    this.bookForm.get('image').updateValueAndValidity();
    console.log(file);
    // console.log(this.bookForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      // this.fileName = this.file.name;
    };
    reader.readAsDataURL(file);
  }

}
function then(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}

