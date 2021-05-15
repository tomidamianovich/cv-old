const mongoose = require('mongoose');

const LOCAL_URI = "mongodb://localhost/mern"

mongoose.connect(process.env.URI || LOCAL_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('DB is connected.');
})