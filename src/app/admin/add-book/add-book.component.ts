import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  imagePreview: any;

  constructor() { }

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
  }

  onSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.bookForm.patchValue({image: file});
    this.bookForm.get('image').updateValueAndValidity();
    console.log(file);
    // console.log(this.bookForm);
    const reader = new FileReader;
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
