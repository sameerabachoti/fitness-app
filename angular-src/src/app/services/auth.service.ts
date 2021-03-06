import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  isDev:boolean;

  constructor(private http:Http) { }

  registerUser(user){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:3000/users/register', user,{headers:headers}).map(res => res.json());
  }

  authenticateUser(user){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  checkEmail(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/check-email', user, {headers: headers}).map(res => res.json());
  }

  checkUsername(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/check-username', user, {headers: headers}).map(res => res.json());
  }

  storeUserData(token, user){
  	localStorage.setItem('id_token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token; 
  	this.user = user; 
  }

  logout(){
    this.authToken = null; 
    this.user = null; 
    localStorage.clear();
  }

}
