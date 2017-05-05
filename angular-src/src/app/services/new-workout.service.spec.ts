import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutsService {

  constructor(private http: Http) { }

  addNewWorkout(workout){
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:8080/api/workouts', workout,{headers:headers}).map(res => res.json());
  }


}