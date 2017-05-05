import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'; 

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';

import {ValidateService} from './services/validate.service';
import {WorkoutsService} from './services/workouts.service';
import {AuthService} from './services/auth.service';
import {NewWorkoutService} from './services/new-workout.service';
import {UpdateWorkoutService} from './services/update-workout.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { UpdateWorkoutComponent } from './components/update-workout/update-workout.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'workouts', component: WorkoutsComponent},
  {path: 'new-workout', component: NewWorkoutComponent},
  {path: 'update-workout', component: UpdateWorkoutComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent, 
    WorkoutsComponent, NewWorkoutComponent, UpdateWorkoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule 
  ],
  providers: [ValidateService, AuthService, WorkoutsService, NewWorkoutService, UpdateWorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }