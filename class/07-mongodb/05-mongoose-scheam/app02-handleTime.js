
// getting-started.js
const mongoose = require('mongoose');
const userModel = require('./Model/school.js');
const moment = require('moment');
//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});



const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {


	userModel.findOne(
		{
			name:'Mike',
		}

	)
	.then(docs=>{
		//console.log(docs.loginAt);
		/*
		//方法一new Date实例
		const date = new Date(docs.loginAt);
		console.log(date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
		*/
		//方法二 用moment框架
		
		console.log(moment(docs.loginAt).format('YYYY-MM-DD HH:mm:ss'));
	})
	.catch(err=>{
		console.error('this is error::',err);
	})



});


