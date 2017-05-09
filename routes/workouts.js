var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var Workout = require('../models/workout');
MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb');


router.post('/add-workout', (req, res, next) => {
	var workout = new Workout({
		name: req.body.name, //what's submitted in the form
		category: req.body.category,
		length: req.body.length,
		calories: req.body.calories, 
		notes: req.body.notes,
		user_id: req.body.user_id
	});

	Workout.addWorkout(workout, (err, workout) => {

		if(err){
			res.send({success: false, msg: 'Failed to add workout'});
		}else{
			res.send({success: true, msg: 'Workout added.'});
		}
	});
});

//Get all workouts
router.get('/workouts', (req, res, next) => {
	
	MongoClient.connect("mongodb://localhost:27017/fitness-app", function (err, db) {
    
		var workouts = db.collection('workouts');

		workouts.find({}, function(err, workout) {
		    workout.toArray(function(err, data){
		    	res.send(data);
		    });
		});
                
	});

	
});

//Get single workout
router.get('/workout/:id', (req, res, next) => {
	
	MongoClient.connect("mongodb://localhost:27017/fitness-app", function (err, db) {
    
		var workouts = db.collection('workouts');
		workouts.findOne({_id: ObjectId(req.params.id)}, function(err, data) {
		    res.send(data);
		});
                
	});

});

//Update workout
router.put('/workout/:id', (req, res, next) => {

	var workout = req.body;

	var updatedWorkout = {};

		updatedWorkout.name = workout.name;
	
		updatedWorkout.category = workout.category;

		updatedWorkout.length = workout.length;

		updatedWorkout.calories = workout.calories;
	
		updatedWorkout.notes = workout.notes;

		updatedWorkout.user_id = workout.user_id;
	

		MongoClient.connect("mongodb://localhost:27017/fitness-app", function (err, db) {
    
			var workouts = db.collection('workouts');
			workouts.update({_id: ObjectId(req.params.id)},updatedWorkout,{}, function(err, data) {
				console.log(err);
			    res.send(data);
			});
	                
		});
});

//Delete Task 
router.delete('/workout/:id', (req, res, next) => {
	
	MongoClient.connect("mongodb://localhost:27017/fitness-app", function (err, db) {
    
		var col = db.collection('workouts');
		col.remove({_id: ObjectId(req.params.id)}, function(err, cursor) {
		    res.send(cursor.id);
		});
                
	});

	
});

module.exports = router;