import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class NewWorkoutService {

  constructor(private http: Http) { }

  getAllWorkouts() {
    return this.http.get('http://localhost:8080/api/workouts')
      .map(res => res.json());
  }

  addWorkout(workout){
    
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:3000/workouts/add-workout', JSON.stringify(workout),{headers:headers}).map(res => res.json());
  }


}
