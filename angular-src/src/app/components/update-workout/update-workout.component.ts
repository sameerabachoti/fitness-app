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
  notes: String;

  

  constructor(public WorkoutsService:WorkoutsService,
 router:Router, 
 flashMessage:FlashMessagesService
  ) { super(WorkoutsService, router, flashMessage); }

  ngOnInit() {
  	/*this.UpdateWorkoutService.UpdateWorkout(id).subscribe(data => {
  	  var workouts = this.workouts;
      if(data.n === 1){
          for(var i = 0; i < workouts.length; i++){
            if(workouts[i]._id === id){
              console.log(workouts[i]);
            }
          }
        }
    });*/
  }

  getWorkoutInfo(id){
  	console.log(id);
  }

  /*updateWorkout(event){
    console.log(this);
    var _workout = {
      name: this.name, 
      category: this.category, 
      calories: this.calories, 
      notes: this.notes
    }
    //console.log(_workout);
    this.WorkoutsService.updateWorkout(_workout).subscribe(data => {
        
        console.log(data);

        //this.flashMessage.show('Workout has been updated', {cssClass: 'alert-success', timeout: 5000});
    });

  }*/

}

