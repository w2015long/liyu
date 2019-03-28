function getRandom(min,max){
	return Math.round(min + (max-min)*Math.random());
}
const names = ['Tom','Amy','Peter','Mike','Rose','Andy','Lucy','Json'];
const majors = ['Math','Computer','Sport','Art','Chemstry','Music','English'];

let getName = ()=> names[getRandom(0,names.length-1)];
let getMajor = ()=> majors[getRandom(0,majors.length-1)];
let getAge = ()=> getRandom(0,120);


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

	//4.用模型操作数据(CRUD)
	/*
	//4.1写数据
	const user = new userModel({ name: 'Mike',age:25,major:'sport' });
	//4.2保存数据到数据库
	user.save((err,doc)=>{
		if(err){
			console.log('this is save error::',err);
		}else{
			console.log(doc);
		}

	})
	*/
	/*
	//4.3查找数据
	userModel.find({} ,(err, docs)=> {
		if (err) return console.log('this is find error::',err);
		console.log(docs);
	})
	*/
	/*
	//4.4更新数据
	
	userModel.updateOne({name:'Tom'},{age:35},(err,result)=>{
		if (err) return console.log('this is updateOne error::',err);
		console.log(result);		
	})
	*/
	//4.5删除数据
	userModel.deleteOne({name:'Tom'},(err,result)=>{
		if (err) return console.log('this is updateOne error::',err);
		console.log(result);
	})


});


