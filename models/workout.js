var restful = require('node-restful');
var mongoose = restful.mongoose;
var bcrypt = require('bcryptjs');
var config = require('../config/database');

var WorkoutSchema = mongoose.Schema({
	name: {
		type: String
	}, 
	category: {
		type: String
	}, 
	length: {
		type: String
	}, 
	calories: {
		type: String 
	}, 
	notes: {
		type: String 
	}, 
	date: {
		type: String
	},
	user_id:{
		type: String
	}
});

var Workout = module.exports = restful.model('Workouts', WorkoutSchema);

module.exports.addWorkout = function(newWorkout, callback){
	newWorkout.save(callback);
}
