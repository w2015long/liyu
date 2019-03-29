
// getting-started.js
const mongoose = require('mongoose');
const blogModel = require('./Model/blog.js');
//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});



const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {


	blogModel.insertMany(
		{
			title:'scheam',
			content:'scheam is a mongoose model',
			author:'5c9d788852aa541d3c37b6e2'
		}

	)
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('this is error::',err);
	})



});


