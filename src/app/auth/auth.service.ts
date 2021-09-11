import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private token: string;
    userId:string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private http:HttpClient, private router: Router){}

    getUserId(){
       return this.userId;
    }

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

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
            this.http.post<{token:string}>('http://localhost:3000/login', authData).subscribe((result: any) => {
                console.log(result);    
            resolve(result);
                
                const token = result.token;
                this.token =  token;
                if(token){
                    this.authStatusListener.next(true);
                    this.isAuthenticated = true;
                }
                this.userId = result.id;
                console.log(result);
                
            }, error => {
                console.log(error);
                rejects(error);
            })
        });
        return promise;
        
    }

    logout(){
        this.token = null;
        this.authStatusListener.next(false);
    }
    
}