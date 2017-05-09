import { Component, OnInit } from '@angular/core';
import { UpdateWorkoutService } from '../../services/update-workout.service';
import { WorkoutsService } from '../../services/workouts.service';
import { WorkoutsComponent } from '../workouts/workouts.component';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.component.html',
  styleUrls: ['./update-workout.component.css']
})
export class UpdateWorkoutComponent extends WorkoutsComponent implements OnInit {

  name: String; 
  category: String; 
  calories: String; 
  length: String; 
  notes: String;

  constructor(public WorkoutsService:WorkoutsService,
 router:Router, 
 flashMessage:FlashMessagesService
  ) { super(WorkoutsService, router, flashMessage); }

  ngOnInit() {
    var url = window.location.pathname;
      var id = url.substring(url.lastIndexOf('/') + 1);

      this.WorkoutsService.getWorkout(id).subscribe(workout => {
        this.name = workout.name;
        this.category = workout.category; 
        this.length = workout.length; 
        this.calories = workout.calories; 
        this.notes = workout.notes; 
        
      });
  }

  updateWorkout(){

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var _workout = {
      id: id,
      name: this.name, 
      category: this.category, 
      length: this.length,
      calories: this.calories, 
      notes: this.notes,
      user_id: JSON.parse(localStorage.getItem("user"))["id"]
    }

    if(_workout.id !== undefined && _workout.name !== undefined && _workout.category !== undefined && _workout.calories !== undefined && _workout.length !== undefined && _workout.notes !== undefined && _workout.user_id !== undefined){
      
      this.WorkoutsService.updateWorkout(_workout).subscribe(data => {

          this.flashMessage.show('Workout has been updated', {cssClass: 'alert-success', timeout: 5000});
      });
    }
    else{
         this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 5000});
    }
    this.router.navigate(['workouts']);
    window.location.reload();

  }

}

