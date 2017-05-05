import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../../services/workouts.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
  
})
export class WorkoutsComponent implements OnInit {

  name: String; 
  category: String; 
  calories: String; 
  notes: String;
  user_id: Number;

  workouts: any = [];

  constructor(public WorkoutsService:WorkoutsService,
  public router:Router, 
  public flashMessage:FlashMessagesService) { }

  ngOnInit() {

  	// Retrieve workouts from the API
    this.WorkoutsService.getAllWorkouts().subscribe(workouts => {

      console.log(localStorage);
      var user = localStorage.getItem("user");
      console.log(user);

      for(var i = 0; i < workouts.length; i++){
        if(workouts[i].user_id === JSON.parse(user)["id"]){
          this.workouts.push(workouts[i]);
        }
      }

    });
  }

  deleteWorkout(id){
    console.log(id);
    var workouts = this.workouts;
    this.WorkoutsService.deleteWorkout(id).subscribe(data => {
        
          for(var i = 0; i < workouts.length; i++){
            if(workouts[i]._id === id){
              workouts.splice(i,1);
            }
          }
        

        this.flashMessage.show('Workout has been deleted', {cssClass: 'alert-success', timeout: 5000});
    });
    window.location.reload();
  }

  updateWorkout(id){
  
    var _workout = {
      id: id,
      name: this.name, 
      category: this.category, 
      calories: this.calories, 
      notes: this.notes,
      user_id: JSON.parse(localStorage.getItem("user"))["id"]
    }

    //console.log(_workout);

    if(_workout.id !== undefined && _workout.name !== undefined && _workout.category !== undefined && _workout.calories !== undefined && _workout.notes !== undefined && _workout.user_id !== undefined){
      this.WorkoutsService.updateWorkout(_workout).subscribe(data => {
          
          this.flashMessage.show('Workout has been updated', {cssClass: 'alert-success', timeout: 5000});
      });
    }
    else{
         this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 5000});
    }

  }


  /*updateWorkout(id){
    console.log(this);
    var _workout = {
      id: id, 
      name: this.name, 
      category: this.category, 
      calories: this.calories, 
      notes: this.notes
    }
    //console.log(_workout);
    this.UpdateWorkoutService.updateWorkout(_workout).subscribe(data => {
        
        console.log(data);

        //this.flashMessage.show('Workout has been updated', {cssClass: 'alert-success', timeout: 5000});
    });*/

  //}

}
