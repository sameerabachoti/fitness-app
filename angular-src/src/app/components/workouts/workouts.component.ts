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

  workouts: any = [];

  constructor(private WorkoutsService:WorkoutsService,
  private router:Router, 
  private flashMessage:FlashMessagesService) { }

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
    var workouts = this.workouts;
    this.WorkoutsService.deleteWorkout(id).subscribe(data => {
        
          for(var i = 0; i < workouts.length; i++){
            if(workouts[i]._id === id){
              workouts.splice(i,1);
            }
          }
        

        this.flashMessage.show('Workout has been deleted', {cssClass: 'alert-success', timeout: 5000});
    });
  }

}
