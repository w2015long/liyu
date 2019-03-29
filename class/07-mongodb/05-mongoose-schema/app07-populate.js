
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
	//需求：通过博客的标题找到博客以及作者所有信息
	/*
	blogModel.findOne(
		{
			title:'method',
		}

	)
	.then(blog=>{
		const result = {blog};
		userModel.findOne({_id:blog.author},(err,user)=>{
			if(err) return console.log('findOne user err',err);
			// console.log(user);
			result.user = user;
			console.log(result);
		})

	})
	.catch(err=>{
		console.log('this is error::',err);
	})	
	*/

	/*
//populate实现
	blogModel.findOne({title:'method'})
	// .populate('author','name age')
	.populate('author')
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('catch error::',err);
	})	
	*/
//静态方法实现
	blogModel.findBlog({title:'method'})
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('catch error::',err);
	})	






});


