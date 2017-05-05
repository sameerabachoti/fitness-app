//allows you to injects this service as a dependency
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class UpdateWorkoutService {

  constructor(private http: Http) { }

  updateWorkout(workout){
  	console.log(workout);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/workouts/workout/'+workout._id, JSON.stringify(workout),{headers:headers}).map(res => res.json());
  }

}
