const mongoose = require('mongoose');

const URI = "mongodb+srv://tomasdamianovich:%24%24tdr%40Cjd17055018@cvCluster.bu7rm.mongodb.net/cv?retryWrites=true&w=majority";

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