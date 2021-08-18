import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { rejects } from "assert";

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

    login(email: string, password: string){
        const authData = {email: email, password: password};
        const promise = new Promise((resolve, rejects) => {
            this.http.post('http://localhost:3000/login', authData).subscribe(result => {
                resolve(result);
            }, error => {
                console.log(error);
                rejects(error);
            })
        });
        return promise;
    }
    
}