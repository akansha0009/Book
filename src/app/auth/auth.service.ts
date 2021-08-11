import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    constructor(private http:HttpClient){}

    signUp(email:string,password:string){
        const authData={ email:email, password:password};
        const promise = new Promise((resolve,reject)=>{
        this.http.post('http://localhost:3000/signUp',authData).subscribe(result => {
            resolve(result);
        }, error => {
            console.log(error);
            reject(error);
        })
        });
     return promise;
    } 
<<<<<<< HEAD
=======

>>>>>>> 9453eb5e411264477dacf4f1621f2c36b41fa509
    
}