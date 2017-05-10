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
  length: String;
  notes: String;
  date: String;
  user_id: Number;

  workouts: any = [];

  constructor(public WorkoutsService:WorkoutsService,
  public router:Router, 
  public flashMessage:FlashMessagesService) { }

  ngOnInit() {

  	// Retrieve workouts from the API
    this.WorkoutsService.getAllWorkouts().subscribe(workouts => {

      var user = localStorage.getItem("user");

      for(var i = workouts.length-1; i >= 0; i--){
        if(workouts[i].user_id === JSON.parse(user)["id"]){
          this.workouts.push(workouts[i]);
        }
      }

    });
  }

  deleteWorkout(id){
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

}
