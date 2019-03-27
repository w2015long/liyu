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
mongoose.connect('mongodb://localhost/liyu', {useNewUrlParser: true});



const db = mongoose.connection;

db.on('error', err=>{
	console.log('connection error:');
	if(err) throw err;
});


db.once('open', () => {
	const userSchema = new mongoose.Schema({
	  name: String,
	  age:Number,
	  major:String
	});  
	//mongoose.model第一个参数表示数据库的集合
	const userModel = mongoose.model('school', userSchema);
	/*
	userModel.insertMany(
		[
			{name:getName(),age:getAge(),major:getMajor()},
			{name:getName(),age:getAge(),major:getMajor()},
			{name:getName(),age:getAge(),major:getMajor()},
			{name:getName(),age:getAge(),major:getMajor()},
			{name:getName(),age:getAge(),major:getMajor()}
		],
		(err,docs)=>{
			if(err){
				console.log('insertMany data err::',err);
			}else{
				console.log(docs);
			}
		}
	)
	*/
	let promise = userModel.insertMany(
		[
			{name:getName(),age:getAge(),major:getMajor()},
			{name:getName(),age:getAge(),major:getMajor()},
		]

	);
	promise
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log('this is error::',err);
	})



});


