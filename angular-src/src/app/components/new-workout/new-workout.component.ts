import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../../services/workouts.service';
import { NewWorkoutService } from '../../services/new-workout.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  name: String; 
  category: String; 
  calories: String; 
  length: String;
  notes: String;

  workouts: any = [];

  constructor(private NewWorkoutService:NewWorkoutService,
	private router:Router, 
	private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  	// add new workout
  }

  addNewWorkout(event) {
  	// add new workout
    var workout = {
  		name: this.name,
  		category: this.category, 
      length: this.length,
  		calories: this.calories, 
  		notes: this.notes, 
      user_id: JSON.parse(localStorage.getItem("user"))["id"]
  	}

    this.NewWorkoutService.addWorkout(workout).subscribe(task => {
        this.workouts.push(task);
        this.name = "";
    })


      this.flashMessage.show('Workout has been added', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['workouts']);
      window.location.reload();

  
      //this.flashMessage.show('Workout has not been added', {cssClass: 'alert-danger', timeout: 5000});
      //this.router.navigate(['new-workout']);

  }

}
