import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    console.log(form);
    this.authService.signUp(form.value.email,form.value.password).then(response =>{
      console.log(response);
    }).catch(error =>{
      console.log(error);
    });
  }

}
