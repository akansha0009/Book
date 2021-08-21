import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      'name': new FormControl(''),
      'author': new FormControl(''),
      'price': new FormControl(''),
      'category': new FormControl(''),
      'description': new FormControl(''),
      'upload': new FormControl('')
    })
  }

  onSubmit(){
    console.log(this.bookForm);
  }

}
