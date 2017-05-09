const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema 
const UserSchema = mongoose.Schema({
	name: {
		type: String
	}, 
	email: {
		type: String,
		required: true, 
	}, 
	username: {
		type: String, 
		required: true, 
	}, 
	password: {
		type: String, 
		required: true
	}
});

//module.exports makes it so that we can use User from outside
//mongoose.model takes in the name of the model and the schema
const User = module.exports = mongoose.model('User', UserSchema); 

//module.exports so that we can use the function outside
//findById is a mongoose function
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//findOne method: find a username matching the username in query
//
module.exports.getUserByUsername = function(username, callback){
	const query = {username: username}
	User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			newUser.password = hash; //hashing the password
			newUser.save(callback)
		}); 
	});
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err; 
		callback(null, isMatch);
	});
}

module.exports.checkEmail = function(userEmail, callback){
	var query = {email: userEmail}
	User.findOne(query, callback);
}

module.exports.checkUsername = function(username, callback){
	var query = {username: username}
	User.findOne(query, callback);
}