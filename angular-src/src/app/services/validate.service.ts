import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class ValidateService {

  email: any;

  constructor(private http:Http) { } 

  	validateRegister(user){
  		if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
  			return false;
  		}
  		else{
  			return true;
  		}
  	}

  	validateEmail(email){
  		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
  	}

  }


