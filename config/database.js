require('dotenv').config();

module.exports = {
	database: process.env.DB_URL, 
	secret: process.env.DB_SECRET
}