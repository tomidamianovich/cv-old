const mongoose = require('mongoose');

const URI = "mongodb+srv://tomasdamianovich:$$tdr@Cjd17055018@cvcluster.bu7rm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost/mern", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('DB is connected.');
})