
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
 	userModel.distinct('name',(err,result)=>{
 		if(err) return console.log('distinct error::',err);
 		console.log(result);
 	})
 	*/

 	userModel.distinct('name',{age:{$gte:100}},(err,result)=>{
 		if(err) return console.log('distinct error::',err);
 		console.log(result);
 	})

});


