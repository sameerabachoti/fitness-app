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
  status: Number;

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

    if(workout.name !== undefined && workout.category !== undefined && workout.calories !== undefined && workout.length !== undefined && workout.notes !== undefined && workout.user_id !== undefined){


      this.NewWorkoutService.addWorkout(workout).subscribe(data => {
        
        this.status = data.status;

         if(this.status === 200){
            this.workouts.push(data);
            this.flashMessage.show('Workout has been added. Status: '+this.status, {cssClass: 'alert-success', timeout: 5000});
         }
         else{
            this.flashMessage.show('Error. Workout has not been added. Status: '+ this.status, {cssClass: 'alert-success', timeout: 5000});
         }
      });

   }
   else{
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 5000});
   }

  }

}
