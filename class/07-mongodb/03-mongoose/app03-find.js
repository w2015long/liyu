
// getting-started.js
const mongoose = require('mongoose');
//1.连接服务器
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {
	//2.定义Scheam
	const userSchema = new mongoose.Schema({
	  name: String,
	  age:Number,
	  major:String
	}); 
	//3.生成模型model 
	//mongoose.model第一个参数表示数据库的集合,mongoose会自动变为复数
	//mongoose.model第二个参数指定Scheam 
	const userModel = mongoose.model('school', userSchema);
/*
查找
	Model.find()
	Model.findById()
	Model.findOne()
 */	
 	/*
 	userModel.find({age:{$gt:80}},(err,docs)=>{
 		if(err) return console.log('find error::',err);
 		console.log(docs);
 	})
 	
 	//只显示name age 默认显示_id 所以-_id 就是不显示
 	userModel.find({age:{$lt:50}},'name age -_id',(err,docs)=>{
 		if(err) return console.log('find error::',err);
 		console.log(docs);
 	})
 	
 	userModel.find({},'name age -_id',{skip:3},(err,docs)=>{
 		if(err) return console.log('find error::',err);
 		console.log(docs);
 	})
 	
 	userModel.find({},null,{limit:3},(err,docs)=>{
 		if(err) return console.log('find error::',err);
 		console.log(docs);
 	}) 
 	*/
 
 	/*
 	//sort排序
 	let query = userModel.find({},null,{sort:{age:-1}},(err,docs)=>{
 		if(err) return console.log('find error::',err);
 		console.log(docs);
 	}) 
 	console.log(query);
 	*/
	 /*
 	userModel.findOne({age:{$gt:60}},'name age -_id',(err,doc)=>{
 		if(err) return console.log('findOne error::',err);
 		console.log(doc);
 	})
 	*/
 	userModel.findById({_id:"5c9c2be8ebc2e71cbcb49445"},'name age -_id',(err,doc)=>{
 		if(err) return console.log('findOne error::',err);
 		console.log(doc);
 	}) 
});


