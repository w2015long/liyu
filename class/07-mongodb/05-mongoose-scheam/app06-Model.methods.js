
// getting-started.js
const mongoose = require('mongoose');
const userModel = require('./Model/school.js');
const blogModel = require('./Model/blog.js');

//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});



const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {
	//需求：找到一个用户发表的博文
	userModel.findByPhone(16689898989,(err,user)=>{
		if(err) return console.log('findByPhone err:',err);
		console.log(user);
	})





});


