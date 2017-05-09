import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String; 
  password: String; 

  constructor(
	private authService:AuthService,
	private router:Router, 
	private flashMessage:FlashMessagesService
  	) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	var user = {
  		username: this.username,
  		password: this.password
  	}

  this.authService.authenticateUser(user).subscribe(data => {
  	if(data.success){
  		this.authService.storeUserData(data.token, data.user);
  		this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
  		this.router.navigate(['workouts']);
      window.location.reload();
  	}else{
  		this.flashMessage.show('Login failed', {cssClass: 'alert-danger', timeout: 3000});
  		this.router.navigate(['login']);
      window.location.reload();
  	}
  });

 }

}
