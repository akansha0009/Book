import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup= new FormGroup({});
  public rollno:any;
  newForm:FormGroup;
  
  constructor(private authService: AuthService){
  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(""),
      'password': new FormControl("")
      });
  }

  onSubmit(){
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((response: any) => {
      console.log(response)
    })
  }
}
