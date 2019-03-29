
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
			title:'method',
			content:'method meybe make a successful',
			author:'5c9d847587917e18ecbc4510'
		}

	)
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('this is error::',err);
	})



});


