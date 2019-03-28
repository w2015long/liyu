
// getting-started.js
const mongoose = require('mongoose');

const userModel = require('./Model/school.js')
//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {


	
 	userModel.distinct('name',(err,result)=>{
 		if(err) return console.log('distinct error::',err);
 		console.log(result);
 	})
 
 	/*
 	userModel.distinct('name',{age:{$gte:100}},(err,result)=>{
 		if(err) return console.log('distinct error::',err);
 		console.log(result);
 	})
 	*/

});


