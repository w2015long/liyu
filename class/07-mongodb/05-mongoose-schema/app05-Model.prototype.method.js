
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
	userModel.findOne({
    	name: 'Mike',
    	age: 30,

	})
	.then(user=>{
		/*
		// console.log(user._id);
		blogModel.find({author:user._id},(err,blogs)=>{
			if(err){
				console.log('this is findMany Blog err',err);
			}else{
				console.log(blogs);
			}
		})
		*/
		//自定义实例方法
		user.findBlogs((err,blogs)=>{
			if(err){
				console.log('this is findMany Blog err',err);
			}else{
				console.log(blogs);
			}
		})







	})
	.catch(err=>{
		console.log('this is error::',err);
	})	





});


