import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup= new FormGroup({});
  constructor(){

  }
  ngOnInit(){
    let newFOrm = new FormGroup({
      'username': new FormControl(" "),
      'email': new FormControl(" ")
      })
  }

}
