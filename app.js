const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
require('dotenv').config();


mongoose.connect(config.database);

mongoose.connection.on('connected', function(){
	console.log("Connected to database " + config.database);
});


mongoose.connection.on('error', (err) => {
	console.log("Database error: " + err);
});

const app = express();

const users = require('./routes/users');
const workouts = require('./routes/workouts');

const port = process.env.PORT; 

app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); 

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/workouts', workouts);

app.get('/', (req, res) => {
	res.send('Invalid endpoint.');
});

app.listen(port, () => {
	console.log('Server started on port' + port);
}); 