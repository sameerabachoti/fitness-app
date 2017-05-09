import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../../services/workouts.service';
import { WorkoutsComponent } from '../workouts/workouts.component';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-workout',
  templateUrl: './show-workout.component.html',
  styleUrls: ['./show-workout.component.css']
})

export class ShowWorkoutComponent extends WorkoutsComponent implements OnInit {

  workout: any = [];

  constructor(public WorkoutsService:WorkoutsService,
 router:Router, 
 flashMessage:FlashMessagesService
  ) { super(WorkoutsService, router, flashMessage); }

  ngOnInit() {

	  	var url = window.location.pathname;
	    var id = url.substring(url.lastIndexOf('/') + 1);

	    this.WorkoutsService.getWorkout(id).subscribe(workout => {
	    	this.workout = workout;
	      
	    });
   }

}
