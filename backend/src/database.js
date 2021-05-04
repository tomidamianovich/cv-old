const mongoose = require('mongoose');

const URI = "mongodb://localhost/cv";

mongoose.connect("mongodb://localhost/cv", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('DB is connected.');
})