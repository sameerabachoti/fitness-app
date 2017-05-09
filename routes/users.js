var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user');


router.post('/register', (req, res, next) => {
	var newUser = new User({
		name: req.body.name, 
		email: req.body.email,
		username: req.body.username,
		password: req.body.password 
	});

	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({success: false, msg: 'Failed to register user'});
		}else{
			res.json({success: true, msg: 'User registered'});
		}
	});
});

router.post('/check-username', (req, res, next) => {
	var username = req.body.username; 

	User.checkUsername(username, (err, userName) =>{
		if(userName === null){
			return res.json({success: true, msg: 'Username is not taken'}); 
		}
		else{
			return res.json({success: false, msg: 'Username is already taken'});
		}
	});
});

router.post('/check-email', (req, res, next) => {
	var email = req.body.email; 

	User.checkEmail(email, (err, uniqueEmail) =>{
		if(uniqueEmail === null){
			return res.json({success: true, msg: 'Email is not taken'}); 
		}
		else{
			return res.json({success: false, msg: 'Email is already taken'});
		}
	});
});

router.post('/authenticate', (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
	
		if(!user){
			return res.json({success: false, msg: 'User not found'});
		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			
			if(isMatch){
				const token = jwt.sign(user, config.secret, {
					expiresIn: 604800 // 1 week
				});

				res.json({
					success: true, 
					token: "JWT "+token, 
					user: {
						id: user._id, 
						name: user.name, 
						username: user.username, 
						email: user.email
					}
				})
			} else{
				return res.json({success: false, msg: 'Wrong password'});
			}
		});

	});
	
});


module.exports = router;