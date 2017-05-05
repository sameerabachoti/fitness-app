//allows you to injects this service as a dependency
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutsService {

  constructor(private http: Http) { }

  getAllWorkouts() {
    //this means that it will return the results as json
    return this.http.get('http://localhost:3000/workouts/workouts')
      .map(res => res.json());
  }

  deleteWorkout(id){
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/workouts/workout/'+id).map(res => res.json());
  }

}
