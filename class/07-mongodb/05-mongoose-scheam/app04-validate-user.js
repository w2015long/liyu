
// getting-started.js
const mongoose = require('mongoose');
const userModel = require('./Model/school.js');
//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});



const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {
	userModel.insertMany(
		{
			name:'吴京',
			age:23,
			phone:168666666666,
			major:'Art'
		}

	)
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('this is insertMany error::',err);
	})



});


