const mongoose = require('mongoose');

const URI = "mongodb+srv://tomasdamianovich:%24%24tdr%40Cjd17055018@cvcluster.bu7rm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const LOCAL_URI = "mongodb://localhost/mern"

mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('DB is connected.');
})